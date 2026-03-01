-- Active: 1772199519469@@localhost@5432@expense-app-db@public

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP
);

CREATE TABLE expense_groups (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    deleted_at TIMESTAMP
);

CREATE TABLE expense_group_members (
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    group_id UUID REFERENCES expense_groups (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, group_id)
);

CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    group_id UUID REFERENCES expense_groups (id) ON DELETE CASCADE,
    payer_id UUID REFERENCES users (id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    split_type TEXT NOT NULL,
    expense_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP
);