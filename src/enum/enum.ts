export enum MessageEnum {
  CLEAR = "Repository cleared!",
  INVALID_ID = "Invalid id!",
  TITLE_VERIFY_MESSAGE = "`title` should be at least 1 char long",
  STATUS_VERIFY_MESSAGE = "`status` should be 'Overdue, 'Completed', 'Completed' or 'Active'",
  DESCRIPTION_VERIFY_MESSAGE = "`description` should be up to 50 chars long",
  START_DATE_VERIFY_MESSAGE = "the format of `startDate` should be 'YYYY-MM-DD'",
  COMPLETED_DATE_VERIFY_MESSAGE = "the format of `completedDate` should be 'YYYY-MM-DD'",
  DUE_DATE_VERIFY_MESSAGE = "the format of `dueDate` should be 'YYYY-MM-DD'",
}

export enum Status {
  Overdue = "Overdue",
  Completed = "Completed",
  Hold = "Hold",
  Active = "Active",
}
