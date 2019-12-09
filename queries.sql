-- all columns and all rows from the customers table
SELECT * FROM customers

-- we can pick the columns we want to see
SELECT CustomerID, CustomerName, Country, City
FROM customers

-- filter the rows
SELECT CustomerID, CustomerName, Country, City
FROM customers
where country = 'Germany'

-- sorting
SELECT CustomerID, CustomerName, Country, City
FROM customers
order by country, city

-- descending by country and ascending (the default) by city
SELECT CustomerID, CustomerName, Country, City
FROM customers
order by country desc, city

-- contolling how many records to return
select * 
from products
limit 5

-- pagination witn order by, limit and offset
select * 
from products
order by price desc
limit 5
offset 10

-- adding records
insert into products (productName, supplierId, categoryId, unit, price)
values ('cake', 7, 1, 'one', 20.99)

insert into products (productName, supplierId, categoryId, unit, price)
values ('carrot cake', 7, 1, 'one', 20.99)

insert into products (productName, supplierId, categoryId, unit, price)
values ('cake candles', 7, 1, 'one', 20.99)

-- partial lookup
SELECT * FROM [Products]
where productName like '%cake%'

SELECT * FROM [Products]
where productName like '%cake'

SELECT * FROM [Products]
where productName like 'cake%'

-- updating records
update products 
set price = 24.99
where productId = 79

-- updating multiple columns
update products 
set price = 24.99, unit = 'whole cake'
where productId = 79

-- removing records
delete FROM [Products] 
where productId = 80
