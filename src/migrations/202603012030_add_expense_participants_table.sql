
CREATE TABLE expense_participants (
    expense_id UUID NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
    participant_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    share_amount DECIMAL NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
)