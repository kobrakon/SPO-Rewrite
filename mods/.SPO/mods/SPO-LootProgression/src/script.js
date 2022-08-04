const database = DatabaseServer.tables

class lootprogression
{
  constructor ()
  {
    this.mod = ModLoader.getModPath["Kobrakon-LootProgression"]
    ModLoader.onLoad[this.mod] = this.load.bind(this)
    HttpRouter.onStaticRoute["/client/game/start"] = Object.assign({"Interceptor": lootprogression.intercept}, HttpRouter.onStaticRoute["/client/game/start"])
    HttpRouter.onStaticRoute["/client/match/join"]["Interceptor"] = lootprogression.intercept // run on raid start
    HttpRouter.onStaticRoute["/client/match/exit"]["Interceptor"] = lootprogression.intercept // run on raid end
  }
  
  load(){}
  
  static intercept(url, info, sessionID)
  {
    doTheThing(sessionID)
  }
  
  static doTheThing (sessionID)
  {
    let pmcData = ProfileController.getPmcProfile(sessionID)
    
    if (!pmcData.Info)
    {
      return
    }
    
    if (pmcData.Info.Level <= 10) // if pmc level is less than or equal to 10, apply changes 
    {
      LocationConfig.looseLootMultiplier.bigmap = 1 // customs
      LocationConfig.looseLootMultiplier.factory4_day = 1
      LocationConfig.looseLootMultiplier.factory4_night = 1
      LocationConfig.looseLootMultiplier.interchange = 1
      LocationConfig.looseLootMultiplier.laboratory = 1
      LocationConfig.looseLootMultiplier.rezervbase = 1 // reserve
      LocationConfig.looseLootMultiplier.shoreline = 1
      LocationConfig.looseLootMultiplier.woods = 1
      LocationConfig.looseLootMultiplier.lighthouse = 1
      
      LocationConfig.staticLootMultiplier.bigmap = 1
      LocationConfig.staticLootMultiplier.factory4_day = 1
      LocationConfig.staticLootMultiplier.factory4_night = 1
      LocationConfig.staticLootMultiplier.interchange = 1
      LocationConfig.staticLootMultiplier.laboratory = 1
      LocationConfig.staticLootMultiplier.rezervbase = 1
      LocationConfig.staticLootMultiplier.shoreline = 1
      LocationConfig.staticLootMultiplier.woods = 1
      LocationConfig.staticLootMultiplier.lighthouse = 1
    }
    
    if (pmcData.Info.Level >= 10) // if pmc level is greater than or equal to 10, apply changes
    {
      LocationConfig.looseLootMultiplier.bigmap = 1
      LocationConfig.looseLootMultiplier.factory4_day = 1
      LocationConfig.looseLootMultiplier.factory4_night = 1
      LocationConfig.looseLootMultiplier.interchange = 1
      LocationConfig.looseLootMultiplier.laboratory = 1
      LocationConfig.looseLootMultiplier.rezervbase = 1
      LocationConfig.looseLootMultiplier.shoreline = 1
      LocationConfig.looseLootMultiplier.woods = 1
      LocationConfig.looseLootMultiplier.lighthouse = 1
      
      LocationConfig.staticLootMultiplier.bigmap = 1
      LocationConfig.staticLootMultiplier.factory4_day = 1
      LocationConfig.staticLootMultiplier.factory4_night = 1
      LocationConfig.staticLootMultiplier.interchange = 1
      LocationConfig.staticLootMultiplier.laboratory = 1
      LocationConfig.staticLootMultiplier.rezervbase = 1
      LocationConfig.staticLootMultiplier.shoreline = 1
      LocationConfig.staticLootMultiplier.woods = 1
      LocationConfig.staticLootMultiplier.lighthouse = 1
    }
    
    if (pmcData.Info.Level >= 20)
    {
      LocationConfig.looseLootMultiplier.bigmap = 1
      LocationConfig.looseLootMultiplier.factory4_day = 1
      LocationConfig.looseLootMultiplier.factory4_night = 1
      LocationConfig.looseLootMultiplier.interchange = 1
      LocationConfig.looseLootMultiplier.laboratory = 1
      LocationConfig.looseLootMultiplier.rezervbase = 1
      LocationConfig.looseLootMultiplier.shoreline = 1
      LocationConfig.looseLootMultiplier.woods = 1
      LocationConfig.looseLootMultiplier.lighthouse = 1
      
      LocationConfig.staticLootMultiplier.bigmap = 1
      LocationConfig.staticLootMultiplier.factory4_day = 1
      LocationConfig.staticLootMultiplier.factory4_night = 1
      LocationConfig.staticLootMultiplier.interchange = 1
      LocationConfig.staticLootMultiplier.laboratory = 1
      LocationConfig.staticLootMultiplier.rezervbase = 1
      LocationConfig.staticLootMultiplier.shoreline = 1
      LocationConfig.staticLootMultiplier.woods = 1
      LocationConfig.staticLootMultiplier.lighthouse = 1
    }
  }
}

module.exports.Mod = lootprogression;
