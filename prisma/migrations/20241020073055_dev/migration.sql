BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Store] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [UserId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Store_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Store_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Billboard] (
    [id] NVARCHAR(1000) NOT NULL,
    [storeId] NVARCHAR(1000) NOT NULL,
    [label] NVARCHAR(1000) NOT NULL,
    [imageUrl] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Billboard_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Billboard_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] NVARCHAR(1000) NOT NULL,
    [storeId] NVARCHAR(1000) NOT NULL,
    [billboardId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Category_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Size] (
    [id] NVARCHAR(1000) NOT NULL,
    [storeId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Size_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Size_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Color] (
    [id] NVARCHAR(1000) NOT NULL,
    [storeId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Color_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Color_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] NVARCHAR(1000) NOT NULL,
    [storeId] NVARCHAR(1000) NOT NULL,
    [categoryId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [price] DECIMAL(32,16) NOT NULL,
    [quantity] INT NOT NULL,
    [sale] INT NOT NULL CONSTRAINT [Product_sale_df] DEFAULT 0,
    [isFeatured] BIT NOT NULL CONSTRAINT [Product_isFeatured_df] DEFAULT 0,
    [isArchived] BIT NOT NULL CONSTRAINT [Product_isArchived_df] DEFAULT 0,
    [sizeId] NVARCHAR(1000) NOT NULL,
    [colorId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Product_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Image] (
    [id] NVARCHAR(1000) NOT NULL,
    [productId] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Image_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Image_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [id] NVARCHAR(1000) NOT NULL,
    [storeId] NVARCHAR(1000) NOT NULL,
    [isPaid] BIT NOT NULL CONSTRAINT [Order_isPaid_df] DEFAULT 0,
    [phone] NVARCHAR(1000) NOT NULL CONSTRAINT [Order_phone_df] DEFAULT '',
    [address] NVARCHAR(1000) NOT NULL CONSTRAINT [Order_address_df] DEFAULT '',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Order_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL,
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[OrderItem] (
    [id] NVARCHAR(1000) NOT NULL,
    [orderId] NVARCHAR(1000) NOT NULL,
    [productId] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL CONSTRAINT [OrderItem_quantity_df] DEFAULT 1,
    CONSTRAINT [OrderItem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Billboard_storeId_idx] ON [dbo].[Billboard]([storeId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Category_storeId_idx] ON [dbo].[Category]([storeId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Category_billboardId_idx] ON [dbo].[Category]([billboardId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Size_storeId_idx] ON [dbo].[Size]([storeId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Color_storeId_idx] ON [dbo].[Color]([storeId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Product_storeId_idx] ON [dbo].[Product]([storeId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Product_categoryId_idx] ON [dbo].[Product]([categoryId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Product_sizeId_idx] ON [dbo].[Product]([sizeId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Product_colorId_idx] ON [dbo].[Product]([colorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Image_productId_idx] ON [dbo].[Image]([productId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Order_storeId_idx] ON [dbo].[Order]([storeId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [OrderItem_orderId_idx] ON [dbo].[OrderItem]([orderId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [OrderItem_productId_idx] ON [dbo].[OrderItem]([productId]);

-- AddForeignKey
ALTER TABLE [dbo].[Billboard] ADD CONSTRAINT [Billboard_storeId_fkey] FOREIGN KEY ([storeId]) REFERENCES [dbo].[Store]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Category] ADD CONSTRAINT [Category_storeId_fkey] FOREIGN KEY ([storeId]) REFERENCES [dbo].[Store]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Category] ADD CONSTRAINT [Category_billboardId_fkey] FOREIGN KEY ([billboardId]) REFERENCES [dbo].[Billboard]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Size] ADD CONSTRAINT [Size_storeId_fkey] FOREIGN KEY ([storeId]) REFERENCES [dbo].[Store]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Color] ADD CONSTRAINT [Color_storeId_fkey] FOREIGN KEY ([storeId]) REFERENCES [dbo].[Store]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Product] ADD CONSTRAINT [Product_storeId_fkey] FOREIGN KEY ([storeId]) REFERENCES [dbo].[Store]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Product] ADD CONSTRAINT [Product_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Product] ADD CONSTRAINT [Product_sizeId_fkey] FOREIGN KEY ([sizeId]) REFERENCES [dbo].[Size]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Product] ADD CONSTRAINT [Product_colorId_fkey] FOREIGN KEY ([colorId]) REFERENCES [dbo].[Color]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Image] ADD CONSTRAINT [Image_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_storeId_fkey] FOREIGN KEY ([storeId]) REFERENCES [dbo].[Store]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderItem] ADD CONSTRAINT [OrderItem_orderId_fkey] FOREIGN KEY ([orderId]) REFERENCES [dbo].[Order]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[OrderItem] ADD CONSTRAINT [OrderItem_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
