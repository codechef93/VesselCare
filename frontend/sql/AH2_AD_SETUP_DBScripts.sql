
CREATE TABLE [VesselCare].[dbo].[UserAccount] (
id INT IDENTITY(1,1) PRIMARY KEY,
username VARCHAR(255)
);
CREATE TABLE [VesselCare].[dbo].[Project] (
ProjectId INT IDENTITY(1,1) PRIMARY KEY,
name NVARCHAR(50),
);
CREATE TABLE [VesselCare].[dbo].[UserAccount_Project] (
idUserAccountProject INT IDENTITY(1,1) PRIMARY KEY,
acountId INT NOT NULL,
projectId INT NOT NULL
);
INSERT INTO [VesselCare].[dbo].[UserAccount] (username) VALUES ('deepak.prasad@kommumbai.com');
INSERT INTO [VesselCare].[dbo].[Project] (name) VALUES ('AH1');
INSERT INTO [VesselCare].[dbo].[UserAccount_Project] (acountId, projectId) VALUES (1, 1);
INSERT INTO [VesselCare].[dbo].[Project] (name) VALUES ('AH2');
INSERT INTO [VesselCare].[dbo].[UserAccount_Project] (acountId, projectId) VALUES (1, 2);

INSERT INTO [dbo].[UserAccount](username ) VALUES ('manikandan.b@keppelom.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('siddharth.singh@kommumbai.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('deepak.prasad@kommumbai.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('weylii.lee@keppelom.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('yakyang.lim@keppelfels.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('cheowjoo.chia@keppelfels.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('tengho.ong@keppelom.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('muthuveluganesh.s@keppelom.com');
INSERT INTO [dbo].[UserAccount](username ) VALUES ('myokyaw.soe@keppelom.com');

INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('manikandan.b@keppelom.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('siddharth.singh@kommumbai.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('deepak.prasad@kommumbai.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('weylii.lee@keppelom.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('yakyang.lim@keppelfels.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('cheowjoo.chia@keppelfels.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('tengho.ong@keppelom.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('muthuveluganesh.s@keppelom.com');
INSERT INTO [VesselCare].[dbo].[UserAccount](username) VALUES ('myokyaw.soe@keppelom.com');
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='manikandan.b@keppelom.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='siddharth.singh@kommumbai.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='deepak.prasad@kommumbai.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='weylii.lee@keppelom.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='yakyang.lim@keppelfels.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='cheowjoo.chia@keppelfels.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='tengho.ong@keppelom.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='muthuveluganesh.s@keppelom.com'),1);
INSERT [VesselCare].[dbo].[UserAccount_Project](accountId,projectId) VALUES ((select id from [dbo].[UserAccount] where username='myokyaw.soe@keppelom.com'),1);