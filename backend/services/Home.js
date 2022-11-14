const sql = require("mssql");
const config = require("../config/config");
const { interfaceObj } = require("./interfaces/SQLInterface.js");

("use strict");
class Home {
  constructor() {
    this.sqlInterface = interfaceObj;
  }

  async GetHome() {
    let results = await this.sqlInterface.PerformQueryPromise(
      `
        SELECT "BOOM ANGLE" as BOOMANGLE, "AF OR CURR" as AFCURR, "AF JIB CURR" as JIBCURR, "AF OR MAX" as AFMAX, "JIB OR MAX" as JIBMAX , 
        CONVERT(datetime, SWITCHOFFSET(AH2DataReceivedDate, DATEPART(TZOFFSET, 
        AH2DataReceivedDate AT TIME ZONE 'Singapore Standard Time'))) as ReceivedDateTime
        FROM [VesselCare].[dbo].[AH2CurrentData] cross apply openjson(AH2Datafieldvalues) 
        with (CLMS nvarchar(max) as json) as lev1
        cross apply openjson(lev1.CLMS) 
        with ("BOOM OUTREACH" nvarchar(max) as json) as lev2
        cross apply openjson(lev2."BOOM OUTREACH") 
        with ("BOOM ANGLE"  numeric(10,2),"AF OR CURR" numeric(10,2),"AF JIB CURR" numeric(10,2),"AF OR MAX" numeric(10,2), "JIB OR MAX" numeric(10,2)) as lev3
        where AH2Datafieldvalues  like '%CLMS%'
        `,
      []
    );
    return results;
    // this.sqlInterface.PerformQuery(`
    // Select * from test where id = 31 union
    // Select * from test where id = 3
    // `, [], (result, err) => {
    //     if (err) console.log("error", err);
    //     else callback(result[1], err);
    // })
  }

  async GetAssets() {
    let results = await this.sqlInterface.PerformQueryPromise(
      `
            Select 'M1' as Asset,JSON_VALUE([AH2Datafieldvalues],N'$.DeviceID') as DeviceID, CONVERT(datetime, SWITCHOFFSET(AH2DataReceivedDate, DATEPART(TZOFFSET, 
            AH2DataReceivedDate AT TIME ZONE 'Singapore Standard Time'))) as ReceivedDateTime,  JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M1.LOAD') as Load, ISNULL(REPLACE(ltrim(rtrim(JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M1.COLOR'))),'',null),'RED') as Color, JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M1.LOC') as Location from [VesselCare].[dbo].[AH2CurrentData] where AH2Datafieldvalues  like '%CLMS%' and JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M1.COLOR') is not null Union
            Select 'M2' as Asset,JSON_VALUE([AH2Datafieldvalues],N'$.DeviceID') as DeviceID,CONVERT(datetime, SWITCHOFFSET(AH2DataReceivedDate, DATEPART(TZOFFSET, 
            AH2DataReceivedDate AT TIME ZONE 'Singapore Standard Time'))) as ReceivedDateTime, JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M2.LOAD') , ISNULL(REPLACE(ltrim(rtrim(JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M2.COLOR'))),'',null),'GREEN') as Color, JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M2.LOC') as Location from [VesselCare].[dbo].[AH2CurrentData] where AH2Datafieldvalues  like '%CLMS%' and JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M2.COLOR') is not null union 
            Select 'M3' as Asset,JSON_VALUE([AH2Datafieldvalues],N'$.DeviceID') as DeviceID,CONVERT(datetime, SWITCHOFFSET(AH2DataReceivedDate, DATEPART(TZOFFSET, 
            AH2DataReceivedDate AT TIME ZONE 'Singapore Standard Time'))) as ReceivedDateTime,  JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M3.LOAD') , ISNULL(REPLACE(ltrim(rtrim(JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M3.COLOR'))),'',null),'YELLOW') as Color, JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M3.LOC') as Location from [VesselCare].[dbo].[AH2CurrentData] where AH2Datafieldvalues  like '%CLMS%' and JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M3.COLOR') is not null union 
            Select 'M4' as Asset,JSON_VALUE([AH2Datafieldvalues],N'$.DeviceID') as DeviceID,CONVERT(datetime, SWITCHOFFSET(AH2DataReceivedDate, DATEPART(TZOFFSET, 
            AH2DataReceivedDate AT TIME ZONE 'Singapore Standard Time'))) as ReceivedDateTime,  JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M4.LOAD') , ISNULL(REPLACE(ltrim(rtrim(JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M1.COLOR'))),'',null),'BLUE') as Color, JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M4.LOC') as Location  from [VesselCare].[dbo].[AH2CurrentData] where AH2Datafieldvalues  like '%CLMS%' and JSON_VALUE([AH2Datafieldvalues],N'$.CLMS.M4.COLOR') is not null
        `,
      []
    );
    return results;
  }

  async GetMapData() {
    console.log("before getMapData");
    let results = await this.sqlInterface.PerformQueryPromise(
      `
      SELECT [AH2DataEntryId]
      ,[assetEntryDataId]
      ,[AH2Datafieldvalues]
      ,[AH2DataReceivedDate]
      FROM [VesselCare].[dbo].[AH2CurrentData]
      WHERE [AH2DataEntryId] = 4
        `,
      []
    );
    return results;
  }
}
module.exports = Home;
