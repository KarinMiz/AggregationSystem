const Data = require('../models/data_model')

const getData = (req, res)=>{
    const timestamp = req.body.timestamp

    for(var key in req.body){
        if(key != "timestamp"){
            const robot = Data({
                timestamp: timestamp,
                robotId: key,
                alertsNumber: req.body[key]
            })

            robot.save((error)=>{
                if (error){
                    res.status(400).send({
                        'status': 'failed',
                        'error': error.message
                        
                    })
                }
            })
        
        }

    }
    
    res.status(200).send({
        "status": 'ok'
    })

}

const geStatistics = async(req, res)=>{
    var currentTime = Date.now()/1000.0;
    var lastMin = currentTime - 60 ;
    var lastHour = currentTime - 60 * 60 ;

    try{

        const statistics = {
            last_minute: await getRobotsAcorddingTime(lastMin),
            last_hour: await getRobotsAcorddingTime(lastHour),
            crashedRobots: await getCrashedRobots()
        }
 
        res.status(200).send({
            'status': 'OK',
            'statistics': statistics
        })
        


    } catch (err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }

}

 async function getRobotsAcorddingTime(timeRange){
    const query = {timestamp:{$gt:timeRange}}
    robots = await Data.find(query)
    
    const relevantRobots = {}
    for(i = 0; i< robots.length; i++){
   
        if(robots[i].robotId in relevantRobots){
         
            relevantRobots[robots[i].robotId]+= Math.abs(robots[i].alertsNumber)
        }
        else{
            relevantRobots[robots[i].robotId] = Math.abs(robots[i].alertsNumber)
        }       
    }

    ar = []
    ar.push(relevantRobots)
    ar.sort((a,b) => (b.alertsNumber - a.alertsNumber))
    ar = ar.slice(0,10)

    return ar

}

async function getCrashedRobots (){
    var currentTime = Date.now()/1000.0;
    var lastDay = currentTime - 24 * 60 * 60;
    const crashedArr=[]
    const query = {timestamp:{$gt:lastDay}}
    const query2 = {alertsNumber:-1}
    robots = await Data.find(query && query2)
    robots.map((r)=>{ 
        r.timestamp+= 3 *60*60  
        var date = new Date(r.timestamp * 1000);

        date= date.toISOString().split("T")[1].split(".")[0]
        crashedArr.push({robotId:r.robotId,timestamp:date})
    })
    return crashedArr
}


module.exports ={
    getData,
    geStatistics
}