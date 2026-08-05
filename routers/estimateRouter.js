import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import Anthropic from "@anthropic-ai/sdk";

const router = express.Router();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post("/", async (req, res, next) => {
  const {
    totalBalance,
    numberOfMonths,
    estimateExpenses,
    estimateIncome,
    estimateTotalBalance,
    mostSpendingItem,
    targetMOnths,
  } = req.body;
  try {
    const categoryList = Object.entries(mostSpendingItem)
      .map(([category, amount]) => `${category}: $${amount}`)
      .join(", ");

    const prompt = `
Here is a user's expense breakdown by category over the last ${numberOfMonths} months:
${categoryList}

In another ${targetMOnths} months:
- Estimated expenses: ${estimateExpenses}
- Estimated income: ${estimateIncome}
- Estimated balance: ${estimateTotalBalance}

Identify:
1. The category with the highest spending.
2. The category with the lowest spending.
3. One practical suggestion to reduce expenses.
4. One practical suggestion to increase income.

Respond ONLY with valid JSON. Do not include markdown, explanations, or extra text.

{
  "mostSpending": {
    "category": "",
    "amount": 0
  },
  "leastSpending": {
    "category": "",
    "amount": 0
  },
  "reduceExpenseSuggestion": "",
  "increaseIncomeSuggestion": ""
}
`;

    const aiResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const insight = aiResponse.content[0].text;

    res.status(200).json({
      status: "success",
      message: insight,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
