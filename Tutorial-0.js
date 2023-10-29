//Small tutorial

module.exports.loop = function () {
    //this nightmare fule is the overkill school of thought for finding any errors that aren't displaying and making your code crash how you want it to in some graceful manner.
    //If the game code does die on you it should let you see what didn't show up normally.
    try{
        //the first chunk is what spawner are we using
        //next we tell it to use the spawnCreep function
        //in this case it's first slot is for the creep parts, this can be any combination of parts from the creep part list found in the API-Doc
        //next is the creep name, once you start having more than 1 creep it's heavily advised that you generate a name based on the main role,
        //what spawner made the creep, and the room it was made in this way you have a unique name each time
        //the last one is for messing with creep memory, this is a list as well, there's just only one item in it for now.
        //the var at the start is purely for checking the error to see what we're causing to happen. Toss the output into the console to see what we're getting
        //if it's 0 than we don't have to think much since the error isn't here
        //var spawnCheck = Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE], 'Harvester1', { memory: { role: 'harvester' } } );
        
        //this line of code and all it's forms is your new best friend in this game since it well help you find out what the output error of any screeps function is if it has one,
        //for anything that doesn't have one convert to string first than dump it in a log.
        //console.log("Spawn Attempt Output: " + spawnCheck);
        
        var spawnCheck2 = Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE],'Mapurunga');
        console.log("Spawn Attempt Output: " + spawnCheck2);
        
        var mycreep = Game.creeps['Mapurunga'];
        console.log("Creep Output: " + mycreep);
        
        //code works nice normally but what you want for a energy harvester is found in tutorial 1 through 5 of the base game in the training tab
        //this code runs well for an upgrader but you want a harvester to start, than an upgrader
        /*if(mycreep.store[RESOURCE_ENERGY] == 0){
            var source = Game.getObjectById('c74df71f323e449ee6fbeb9a');
            
            mycreep.moveTo(source);
            mycreep.harvest(source);
        }
        else
        {
            var controller1 = mycreep.room.controller;
            mycreep.moveTo(controller1);
            mycreep.upgradeController(controller1);
        }*/
        //the first thing this does is check if it has any free capacity at all since creeps can pickup any resources lying around including energy
        if(mycreep.store.getFreeCapacity() > 0) {
            //this is just another way to find a source in the room, replace with whatever works best for you
            //that said you'll want to find a source you don't have any harvesters assigned to down the road for when it becomes an issue.
            var sources = mycreep.room.find(FIND_SOURCES);
            //down here we're telling the creep to harvest if in range, fun trait of screeps code often giving an error is you can use it this way.
            //if not in range it moves closer
            if(mycreep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                mycreep.moveTo(sources[0]);
            }
        }
        else {
            //now down here we should be checking if the spawner is full or not but that's not interesting at the moment
            //although if you want to use the controller as your failsafe target you'll have to check if the spawner is full of energy
            if(mycreep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                mycreep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
    catch(err)
    {
        console.log("Main Code Error: " + err);
        console.log("Main Code Error Stack: " + err.stack);
    }
}
