import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";


class SPO implements IPostDBLoadMod
{
    public PostDBLoad(container: DependencyContainer): void
    {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const database = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const globals = database.globals.config;
        const locations = database.locations;
        const items = database.templates.items;
        const suits = database.templates.customization;
        const traders = database.traders;
        const hideout = database.hideout;
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const InraidConfig = configServer.getConfig<IInRaidConfig>(ConfigTypes.IN_RAID);
        const LocationConfig = configServer.getConfig<ILocationConfig>(ConfigTypes.LOCATION);
        const RagfairConfig = configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const AirdropConfig = configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);
        const InventoryConfig = configServer.getConfig<IInventoryConfig>(ConfigTypes.INVENTORY);
        const BotConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        const skillsSettings = globals.SkillsSettings;
        const aimDrillsSkill = skillsSettings.AimDrills;
        const assaultSkill = skillsSettings.Assault;
        const attentionSkill = skillsSettings.Attention;
        const charismaSkill = skillsSettings.Charisma;
        const covertMovementSkill = skillsSettings.CovertMovement;
        const craftingSkill = skillsSettings.Crafting;
        const dmrSkill = skillsSettings.DMR;
        const enduranceSkill = skillsSettings.Endurance;
        const healthSkill = skillsSettings.Health;
        const hideoutManagementSkill = skillsSettings.HideoutManagement;
        const hideoutEliteSlots = hideoutManagementSkill.EliteSlots;
        const hideoutSkillPointRate = hideoutManagementSkill.SkillPointsRate;
        const immunitySkill = skillsSettings.Immunity;
        const intellectSkill = skillsSettings.Intellect;
        const magDrillSkill = skillsSettings.MagDrills;
        const memorySkill = skillsSettings.Memory;
        const metabolismSkill = skillsSettings.Metabolism;
        const perceptionSkill = skillsSettings.Perception;
        const pistolSkill = skillsSettings.Pistol;
        const recoilControlSkill = skillsSettings.RecoilControl;
        const searchSkill = skillsSettings.Search;
        const shotgunSkill = skillsSettings.Shotgun;
        const sniperSkill = skillsSettings.Sniper;
        const strengthSkill = skillsSettings.Strength;
        const stressResistanceSkill = skillsSettings.StressResistance;
        const surgerySkill = skillsSettings.Surgery;
        const throwingSkill = skillsSettings.Throwing;
        const troubleShootingSkill = skillsSettings.TroubleShooting;
        const vitalitySkill = skillsSettings.Vitality;
        const weaponTreatmentSkill = skillsSettings.WeaponTreatment;

        Logger.LogInfo("Initializing SPO server-side scripts, this is gonna take a bit...");

        // AIO changes

        const t7 = items["5c110624d174af029e69734c"]._props;
        t7.IsMotionBlurred = false;
        t7.Mask = "Anvis";
        t7.MaskSize = 1.5;
        t7.IsNoisy = false;
        t7.NoiseIntensity = 0;
        t7.RampShift = -0.1;
        t7.MainTexColorCoef = 1.3;
        t7.MinimumTemperatureValue = 0;
        const thermal = items["5d21f59b6dbe99052b54ef83"]._props;
        thermal.IsMotionBlurred = false;
        thermal.IsNoisy = false;
        thermal.NoiseIntensity = 0;

        const inventory = items["55d7217a4bdc2d86028b456d"];
        const holster = inventory._props.Slots[2];
        holster._props.filters[0].Filter.push("5d2f0d8048f0356c925bc3b0");
        holster._props.filters[0].Filter.push("5ba26383d4351e00334c93d9");
        holster._props.filters[0].Filter.push("5bd70322209c4d00d7167b8f");
        holster._props.filters[0].Filter.push("5de7bd7bfd6b4e6e2276dc25");
        holster._props.filters[0].Filter.push("5e00903ae9dc277128008b87");
        holster._props.filters[0].Filter.push("57f4c844245977379d5c14d1");
        holster._props.filters[0].Filter.push("57f3c6bd24597738e730fa2f");
        holster._props.filters[0].Filter.push("57d14d2524597714373db789");

        items["606eef46232e5a31c233d500"]._props.ExtraSizeDown = 0;

        // end AIO changes
        // skills changes

        skillsSettings.SkillProgressRate = 0.25;
        skillsSettings.WeaponSkillProgressRate = 2;
        globals.SkillAtrophy = false;
        globals.SkillExpPerLevel = 100;
        globals.SkillFatiguePerPoint = 0.6;
        globals.SkillFatigueReset = 30;
        globals.SkilLFreshEffectiveness = 1;
        globals.SkillFreshPoints = 1;
        globals.SkillMinEffectiveness = 0.0001;
        globals.SkillPointsBeforeFatigue = 100;

        aimDrillsSkill.WeaponShotAction = 1.2;

        assaultSkill.WeaponChamberAction = 0.25;
        assaultSkill.WeaponFixAction = 15;
        assaultSkill.WeaponReloadAction = 0.15;
        assaultSkill.WeaponShotAction = 0.25;

        attentionSkill.ExamineWithInstruction = 4;
        attentionSkill.FindActionFalse = 1.1;
        attentionSkill.FindActionTrue = 0.9;

        charismaSkill.SkillProgressAtn = 0.5;
        charismaSkill.SkillProgressInt = 0.5;
        charismaSkill.SkillProgressPer = 0.5;

        covertMovementSkill.MovementAction = 0.6;

        craftingSkill.CraftTimeReductionPerLevel = 0.75;
        craftingSkill.CraftingCycleHours = 4;
        craftingSkill.CraftingPointsToInteligence = 15;
        craftingSkill.EliteExtraProductions = 3;
        craftingSkill.PointsPerCraftingCycle = 5;
        craftingSkill.PointsPerUniqueCraftCycle = 8;
        craftingSkill.ProductionTimeReductionPerLevel = 0.75;
        craftingSkill.UniqueCraftsPerCycle = 1;

        dmrSkill.WeaponChamberAction = modConfig.DMR.WeaponChamberAction;
	dmrSkill.WeaponFixAction = modConfig.DMR.WeaponFixAction;
	dmrSkill.WeaponReloadAction = modConfig.DMR.WeaponReloadAction;
	dmrSkill.WeaponShotAction = modConfig.DMR.WeaponShotAction;

        enduranceSkill.GainPerFatigueStack = modConfig.Endurance.GainPerFatigueStack;
	enduranceSkill.MovementAction = modConfig.Endurance.MovementAction;
	enduranceSkill.SprintAction = modConfig.Endurance.SprintAction;

        healthSkill.SkillProgress = modConfig.Health.SkillProgress;

        hideoutManagementSkill.ConsumptionReductionPerLevel = modConfig.HideoutManagement.ConsumptionReductionPerLevel;
	hideoutManagementSkill.SkillBoostPercent = modConfig.HideoutManagement.SkillBoostPercent;
	hideoutManagementSkill.SkillPointsPerAreaUpgrade = modConfig.HideoutManagement.SkillPointsPerAreaUpgrade;
	hideoutManagementSkill.SkillPointsPerCraft = modConfig.HideoutManagement.SkillPointsPerCraft;	
	hideoutEliteSlots.AirFilteringUnit.Container = modConfig.HideoutManagement.EliteSlots.AirFilteringUnit.Container;
	hideoutEliteSlots.AirFilteringUnit.Slots = modConfig.HideoutManagement.EliteSlots.AirFilteringUnit.Slots;	
	hideoutEliteSlots.BitcoinFarm.Container = modConfig.HideoutManagement.EliteSlots.BitcoinFarm.Container;
	hideoutEliteSlots.BitcoinFarm.Slots = modConfig.HideoutManagement.EliteSlots.BitcoinFarm.Slots;
	hideoutEliteSlots.Generator.Container = modConfig.HideoutManagement.EliteSlots.Generator.Container;
	hideoutEliteSlots.Generator.Slots = modConfig.HideoutManagement.EliteSlots.Generator.Slots;
	hideoutEliteSlots.WaterCollector.Container = modConfig.HideoutManagement.EliteSlots.WaterCollector.Container;
	hideoutEliteSlots.WaterCollector.Slots = modConfig.HideoutManagement.EliteSlots.WaterCollector.Slots;
	hideoutSkillPointRate.AirFilteringUnit.PointsGained = modConfig.HideoutManagement.SkillPointsRate.AirFilteringUnit.PointsGained;
	hideoutSkillPointRate.AirFilteringUnit.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.AirFilteringUnit.ResourceSpent;
	hideoutSkillPointRate.Generator.PointsGained = modConfig.HideoutManagement.SkillPointsRate.Generator.PointsGained;
	hideoutSkillPointRate.Generator.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.Generator.ResourceSpent;
	hideoutSkillPointRate.SolarPower.PointsGained = modConfig.HideoutManagement.SkillPointsRate.SolarPower.PointsGained;
	hideoutSkillPointRate.SolarPower.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.SolarPower.ResourceSpent;
	hideoutSkillPointRate.WaterCollector.PointsGained = modConfig.HideoutManagement.SkillPointsRate.WaterCollector.PointsGained;
	hideoutSkillPointRate.WaterCollector.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.WaterCollector.ResourceSpent;

        immunitySkill.HealthNegativeEffect = modConfig.Immunity.HealthNegativeEffect;
        immunitySkill.ImmunityMiscEffects = modConfig.Immunity.ImmunityMiscEffects;
        immunitySkill.ImmunityPainKiller = modConfig.Immunity.ImmunityPainKiller;
        immunitySkill.ImmunityPoisonBuff = modConfig.Immunity.ImmunityPoisonBuff;
        immunitySkill.StimulatorNegativeBuff = modConfig.Immunity.StimulatorNegativeBuff;

        intellectSkill.ExamineAction = modConfig.Intellect.ExamineAction;	
        intellectSkill.RepairAction = modConfig.Intellect.RepairAction;
        intellectSkill.SkillProgress = modConfig.Intellect.SkillProgress;

        magDrillSkill.MagazineCheckAction = modConfig.MagDrills.MagazineCheckAction;
        magDrillSkill.RaidLoadedAmmoAction = modConfig.MagDrills.RaidLoadedAmmoAction;
        magDrillSkill.RaidUnloadedAmmoAction = modConfig.MagDrills.RaidUnloadedAmmoAction;

        memorySkill.AnySkillUp = modConfig.Memory.AnySkillUp;
        memorySkill.SkillProgress = modConfig.Memory.AnySkillUp;

        metabolismSkill.DecreaseNegativeEffectDurationRate = modConfig.Metabolism.DecreaseNegativeEffectDurationRate;
        metabolismSkill.DecreasePoisonDurationRate = modConfig.Metabolism.DecreasePoisonDurationRate;
        metabolismSkill.EnergyRecoveryRate = modConfig.Metabolism.EnergyRecoveryRate;
        metabolismSkill.HydrationRecoveryRate = modConfig.Metabolism.HydrationRecoveryRate;
        metabolismSkill.IncreasePositiveEffectDurationRate = modConfig.Metabolism.IncreasePositiveEffectDurationRate;

        perceptionSkill.OnlineAction = modConfig.Perception.OnlineAction;
        perceptionSkill.UniqueLoot = modConfig.Perception.UniqueLoot;

        pistolSkill.WeaponChamberAction = modConfig.Pistol.WeaponChamberAction;
        pistolSkill.WeaponFixAction = modConfig.Pistol.WeaponFixAction;
        pistolSkill.WeaponReloadAction = modConfig.Pistol.WeaponReloadAction;
        pistolSkill.WeaponShotAction = modConfig.Pistol.WeaponShotAction;

        recoilControlSkill.RecoilAction = modConfig.RecoilControl.RecoilAction;

        searchSkill.FindAction = modConfig.Search.FindAction;
	searchSkill.SearchAction = modConfig.Search.SearchAction;

        shotgunSkill.WeaponChamberAction = modConfig.Shotgun.WeaponChamberAction;
	shotgunSkill.WeaponFixAction = modConfig.Shotgun.WeaponFixAction;
	shotgunSkill.WeaponReloadAction = modConfig.Shotgun.WeaponReloadAction;
	shotgunSkill.WeaponShotAction = modConfig.Shotgun.WeaponShotAction;

        sniperSkill.WeaponChamberAction = modConfig.Sniper.WeaponChamberAction;
        sniperSkill.WeaponFixAction = modConfig.Sniper.WeaponFixAction;
        sniperSkill.WeaponReloadAction = modConfig.Sniper.WeaponReloadAction;
        sniperSkill.WeaponShotAction = modConfig.Sniper.WeaponShotAction;

        strengthSkill.FistfightAction = modConfig.Strength.FistfightAction;
        strengthSkill.MovementActionMax = modConfig.Strength.MovementActionMax;
        strengthSkill.MovementActionMin = modConfig.Strength.MovementActionMin;
        strengthSkill.PushUpMax = modConfig.Strength.PushUpMax;
        strengthSkill.PushUpMin = modConfig.Strength.PushUpMin;
        strengthSkill.SprintActionMax = modConfig.Strength.SprintActionMax;
        strengthSkill.SprintActionMin = modConfig.Strength.SprintActionMin;
        strengthSkill.ThrowAction = modConfig.Strength.ThrowAction;

        stressResistanceSkill.HealthNegativeEffect = modConfig.StressResistance.HealthNegativeEffect;
        stressResistanceSkill.LowHPDuration = modConfig.StressResistance.LowHPDuration;

        surgerySkill.SkillProgress = modConfig.Surgery.SkillProgress;
        surgerySkill.SurgeryAction = modConfig.Surgery.SurgeryAction;

        throwingSkill.ThrowAction = modConfig.Throwing.ThrowAction;

        troubleShootingSkill.EliteAmmoChanceReduceMult = modConfig.TroubleShooting.EliteAmmoChanceReduceMult;
        troubleShootingSkill.EliteDurabilityChanceReduceMult = modConfig.TroubleShooting.EliteDurabilityChanceReduceMult;
        troubleShootingSkill.EliteMagChanceReduceMult = modConfig.TroubleShooting.EliteMagChanceReduceMult;
        troubleShootingSkill.MalfRepairSpeedBonusPerLevel = modConfig.TroubleShooting.MalfRepairSpeedBonusPerLevel;
        troubleShootingSkill.SkillPointsPerMalfFix = modConfig.TroubleShooting.SkillPointsPerMalfFix;

        vitalitySkill.DamageTakenAction = modConfig.Vitality.DamageTakenAction;
        vitalitySkill.HealthNegativeEffect = modConfig.Vitality.HealthNegativeEffect;

        weaponTreatmentSkill.DurLossReducePerLevel = modConfig.WeaponTreatment.DurLossReducePerLevel;
        weaponTreatmentSkill.Filter = modConfig.WeaponTreatment.Filter;
        weaponTreatmentSkill.SkillPointsPerRepair = modConfig.WeaponTreatment.SkillPointsPerRepair;
        weaponTreatmentSkill.WearChanceReducePerLevel = modConfig.WeaponTreatment.WearChanceReducePerLevel;

        // end skill changes
    }
}

module.exports = { mod: new SPO() }
