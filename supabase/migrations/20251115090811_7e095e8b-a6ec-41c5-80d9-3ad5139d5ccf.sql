-- Add foreign key relationship from enrollments to users_app
ALTER TABLE enrollments 
ADD CONSTRAINT fk_enrollments_users_app 
FOREIGN KEY (user_id) 
REFERENCES users_app(id) 
ON DELETE CASCADE;