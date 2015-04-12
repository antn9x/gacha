var fs = require("fs");
var file = "gacha.db";
var exists = fs.existsSync(file);

if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

var Singleton = (function () {
    var instance;

    return {
        getInstance: function () {
            if (!instance) {
              try{
                var sqlite3 = require("sqlite3").verbose();
                instance = new sqlite3.Database(file);
                instance.on('trace', function(querry){console.log(querry);});
                instance.serialize(function() {
                  if(!exists) {
                    instance.run("CREATE TABLE users (email varchar(50) primary key,password varchar(20),coins int,created_at int,updated_at int)");
                    instance.run("CREATE TABLE items(i_id int primary key,i_name varchar(50),rare smallint)");
                    instance.run("CREATE TABLE user_item(email varchar(50),i_id int,quantity int)");
                    instance.run("CREATE TABLE gacha_probability (g_id int,rare smallint ,probability int, primary key(g_id, rare))");

                 var stmt = instance.prepare("INSERT INTO users VALUES (?,?,?,?,?)");
                 var current  = new Date().getTime()/1000 >> 0;//second
                 stmt.run("admin","admin",5000, current,current);
                 stmt.finalize();
                 var stmt = instance.prepare("INSERT INTO items VALUES (?,?,?)");
                 var item_name = ["Mandrake","Elixir","Panacea","Dried Sage","Heartsblood","Blood Meal","Copper Coin","Silver Coin","Scarlet Coin","Bugle","Gjallarhorn","Event Coin","HP Crystal","Attack Crystal","Defense Crystal","Wisdom Crystal","Agility Crystal","Magic Shard","Keystone Shard","Tower Coins","Jubilee Coin","Event Coin (Labyrinth)","Copper-Sun Coin","Silver-Kindred Coin","Gold-Kindred Coin","Blood Seal","Deyos Coin","Mandrake (Bloodbound)","Heartsblood (Bloodbound)","Gjallarhorn (Bloodbound)","Mandrake Leaf","Event Gold","Event Silver","Dark Ice","Heroes' Writ","Shadow Shards","Ruby Ore","Sapphire Ore","Emerald Ore","Warrior's Seal 1","Warrior's Seal 2","Warrior's Seal 3","Hero's Seal 1","Hero's Seal 2","Hero's Seal 3","Premium-Sun Coin","Rose Coin","Legends Coin","Copper Floret Slip","Silver Floret Slip","Gold Floret Slip","Valor Gem","Fragment of Glory","Fragment of Cheer","Victory Coin","Treasure Ticket","Truesight Amulet","Wereheart Shard","Beastheart Shard","Werebeast Coin","Pumpkin Coin","Snow Gem","Ornament of Ribbons","Ornament of Brilliance","Ornament of Ripples","Sanctum Key","Snowflake Coin","Eden Rose","Blood Rose","Blood Relic","Soul Fragment of Valafar","Celebration Fireworks","Crystallized Time","Christmas Treat","Loyalty Coin","Soulstone of Peony","Soulstone of Cocytus","Soulstone of Aipaloovik","Soulstone of Botis","Mandrake","Elixir","Panacea","Dried Sage","Heartsblood","Blood Meal","Copper Coin","Silver Coin","Scarlet Coin","Bugle","Gjallarhorn","Event Coin","HP Crystal","Attack Crystal","Defense Crystal","Wisdom Crystal","Agility Crystal","Magic Shard","Keystone Shard","Tower Coins","Jubilee Coin"];
                  for (var i=0;i<item_name.length; i++){
                   stmt.run(i,item_name[i],~~(Math.random()*4));
                  }
                 stmt.finalize();
                 var stmt = instance.prepare("INSERT INTO gacha_probability VALUES (?,?,?)");
                  stmt.run(0,0,70);
                  stmt.run(0,1,25);
                  stmt.run(0,2,4);
                  stmt.run(0,3,1);
                  stmt.run(1,0,10);
                  stmt.run(1,1,50);
                  stmt.run(1,2,30);
                  stmt.run(1,3,10);
                  stmt.run(2,0,55);
                  stmt.run(2,1,25);
                  stmt.run(2,2,15);
                  stmt.run(2,3,5);
                 stmt.finalize();

                  }
                });
              }catch(err){
                if (err) {console.log(err)};
                console.log("connected db");
              }
            }
            return instance;
        }
    };
})();

exports.SQLiteSingleton = Singleton.getInstance();