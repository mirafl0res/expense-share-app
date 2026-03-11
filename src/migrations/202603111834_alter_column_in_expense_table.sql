ALTER TABLE expenses
ALTER COLUMN expense_date TYPE DATE
USING expense_date::date;