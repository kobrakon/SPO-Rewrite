class PLL1_ammo_box_762x39_20_PS
{
    constructor()
    {
        this.modname = "PLL1_ammo_box_762x39_20_PS";
        Logger.info(`Loading: ${this.modname}`);
        ModLoader.onLoad[this.modname] = this.load.bind(this);
    }

    load()
    {
        const itemId = "PLL1_ammo_box_762x39_20_PS"; // unique item id, used in tarkov
        const itemClone = "57372b832459776701014e41"; // base item, make clone from this

        // handbook
        const itemCategory = "543be5cb4bdc2deb348b4568"; // Can of beef stew
        const itemFleaPrice = 3000;
        // item
        const itemPrefabPath = "ammo_box_545x39_30_BS"; // Server/mods/this.modname/bundles/... CAB 2e33dcd51900e1153e9615eca8d9afa3 === f2ba5588e4d8c01fb4f96ad9b2fb64bb
        const itemLongName = "7.62x39 PS ammo pack (120 pcs)";
        const itemShortName = "PS";
        const itemDescription = "A paper package of 7.62x39 PS cartridges, 120 pieces.";

        // offer
        const itemTrader = "54cb50c76803fa8b248b4571"; // Prapor
        const itemTraderPrice = 1;
        const itemTraderCurrency = "59e358a886f7741776641ac3"; // RUB: 5449016a4bdc2d6f028b456f USD: 5696686a4bdc2da3298b456a EUR: 569668774bdc2da2298b4568
        const itemTraderLV = 4;

        this.createItemHandbookEntry(itemId, itemCategory, itemFleaPrice, itemLongName, itemShortName, itemDescription);
        this.createItem(itemClone, itemId, itemPrefabPath);
        this.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLV);
    }
    createItemHandbookEntry(i_id, i_category, i_fprice, i_lname, i_sname, i_desc)
    {
        // add item to handbook
        DatabaseServer.tables.templates.handbook.Items.push(
        {
            "Id": i_id, //use item id
            "ParentId": i_category, // category item will show under
            "Price": i_fprice, // price used on fleamarket
        });

        // add custom item names to all languages
        for (const localeID in DatabaseServer.tables.locales.global)
        {
            DatabaseServer.tables.locales.global[localeID].templates[i_id] = {
                "Name": i_lname,
                "ShortName": i_sname,
                "Description": i_desc
            }
        }
    }

    createItem(i_clone, i_id, i_path)
    {
        let item = JsonUtil.clone(DatabaseServer.tables.templates.items[i_clone]); // https://items.sp-tarkov.com/
        // set clone item to custom itemId
        DatabaseServer.tables.templates.items[i_id] = item;

        // change item properties
        item._id = i_id;
        item._props.BackgroundColor = "blue"
        item._props.StackSlots =      
            [{
                  "_name": "cartridges",
                  "_id": "57372bd3245977670b7cd243",
                  "_parent": "PLL1_ammo_box_762x39_20_PS",
                  "_max_count": 120,
                  "_props": {
                    "filters": [
                      {
                        "Filter": [
                          "5656d7c34bdc2d9d198b4587"
                        ]
                      }
                    ]
                  },
                  "_proto": "5748538b2459770af276a261"
                }]
                              
        }
    

    createItemOffer(i_id, i_trader, i_price, i_currency, i_loyalty)
    {
        // add item to trader
        DatabaseServer.tables.traders[i_trader].assort.items.push(
        {
            "_id": i_id,
            "_tpl": i_id,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd":
            {
                "UnlimitedCount": true,
                "StackObjectsCount": 999999 // how many trader has of this item
            }
        });
        // add trader cost to item
        DatabaseServer.tables.traders[i_trader].assort.barter_scheme[i_id] = [
            [
            {
                "count": i_price,
                "_tpl": i_currency
            }]
        ]
        // add trader loyalty level to item
        DatabaseServer.tables.traders[i_trader].assort.loyal_level_items[i_id] = i_loyalty;

        // add item stack to fleamarket
        DatabaseServer.tables.traders.ragfair.assort.items.push(
        {
            "_id": i_id,
            "_tpl": i_id,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd":
            {
                "UnlimitedCount": true,
                "StackObjectsCount": 999999 // how many of this item
            }
        });
        DatabaseServer.tables.traders.ragfair.assort.loyal_level_items[i_id] = 1;
    }
}

module.exports.PLL1_ammo_box_762x39_20_PS = PLL1_ammo_box_762x39_20_PS;
