CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    order_status VARCHAR(64),
    purchase_date DATE DEFAULT CURRENT_DATE,
    delivery_date DATE,
    id UUID,
    CONSTRAINT fk_user
    FOREIGN KEY (id) 
	REFERENCES users(id)
);

