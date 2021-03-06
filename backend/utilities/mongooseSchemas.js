import mongoose from 'mongoose';

export const transactionSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: Date
});

export const budgetCategorySchema = new mongoose.Schema({
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget'
  },
  name: String,
  amount: Number,
  transactions: [mongoose.Schema.Types.ObjectId],
  oldTransactions: [],
  percentage: Number
});

export const budgetSchema = new mongoose.Schema({
  name: String,
  type: String,
  income: Number,
  timeFrame: String,
  nextUpdate: Date,
  favorite: Boolean,
  budgetCategories: [budgetCategorySchema]
});

export const eventsSchema = new mongoose.Schema({
  id: Number,
  subId: Number,
  title: String,
  start: Date,
  end: Date,
  allDay: Boolean,
  amount: Number,
  notify: Boolean,
  dismissed: Object,
  emailed: Object,
  repeat: String
});

export const savingsSchema = new mongoose.Schema({
  title: String,
  category: String,
  goalAmount: Number,
  goalYear: Number,
  goalMonth: String,
  monthlyContribution: Number,
  currSaved: Number,
  favorite: Boolean
});

export const debtSchema = new mongoose.Schema({
  category: String,
  nickname: String,
  initial: Number,
  currBalance: Number,
  interestRate: Number,
  minimumPayment: Number,
  favorite: Boolean
});

export const investmentSchema = new mongoose.Schema({
    type: String,
    startingInvestment: Number,
    currentShareValue: Number,
    company: String,
    favorite: Boolean,
    shares: Number,
    startDate: String,
});

export const allInvestmentsSchema = new mongoose.Schema({
    trackedCompanies: [String],
    investments: [investmentSchema],
    totalInvestment: Number,
});

export const retirementHistorySchema = new mongoose.Schema({
  date: String,
  amount: Number,
});

export const retirementSchema = new mongoose.Schema({
  total: Number,
  history: [retirementHistorySchema]
});

export const notificationScheduleSchema = new mongoose.Schema({
  month: Boolean,
  twoWeek: Boolean,
  week: Boolean,
  day: Boolean,
  dayOf: Boolean,
  emailsEnabled: Boolean
});

export const toolTipScheduleSchema = new mongoose.Schema({
  overview: Boolean,
  budgets: Boolean,
  saving: Boolean,
  recommendSavings: Boolean,
  investments: Boolean,
  debts: Boolean,
  transactions: Boolean,
  assets: Boolean,
  retirement: Boolean,
  tracker: Boolean
});

export const userSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  type: String,
  netWorth: Number,
  budgets: [budgetSchema],
  transactions: [transactionSchema],
  events: [eventsSchema],
  savings: [savingsSchema],
  debts: [debtSchema],
  investments: allInvestmentsSchema,
  retirement: retirementSchema,
  notificationSchedule: notificationScheduleSchema,
  toolTips: toolTipScheduleSchema
});
