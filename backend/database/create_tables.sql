-- Create Room table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Room]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Room] (
        [RoomID] INT PRIMARY KEY,
        [Room_Number] VARCHAR(10) NOT NULL,
        [Type] VARCHAR(50) NOT NULL,
        [number_of_Beds] INT NOT NULL
    )
END

-- Create Beds table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Beds]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Beds] (
        [BedID] INT PRIMARY KEY,
        [RoomID] INT FOREIGN KEY REFERENCES Room(RoomID),
        [Occupied] BIT DEFAULT 0
    )
END

-- Insert sample data if tables are empty
IF NOT EXISTS (SELECT TOP 1 1 FROM Room)
BEGIN
    INSERT INTO Room (RoomID, Room_Number, Type, number_of_Beds) VALUES
    (1, '101', 'General', 4),
    (2, '102', 'ICU', 2),
    (3, '201', 'General', 4),
    (4, '202', 'Private', 1),
    (5, '301', 'Emergency', 6)
END

IF NOT EXISTS (SELECT TOP 1 1 FROM Beds)
BEGIN
    INSERT INTO Beds (BedID, RoomID, Occupied) VALUES
    (1, 1, 0),
    (2, 1, 1),
    (3, 1, 0),
    (4, 1, 0),
    (5, 2, 1),
    (6, 2, 0),
    (7, 3, 0),
    (8, 3, 0),
    (9, 3, 1),
    (10, 3, 0),
    (11, 4, 0),
    (12, 5, 1),
    (13, 5, 0),
    (14, 5, 0),
    (15, 5, 1),
    (16, 5, 0),
    (17, 5, 0)
END 