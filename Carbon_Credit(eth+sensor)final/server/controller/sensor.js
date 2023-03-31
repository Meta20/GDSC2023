const lineByLine = require('n-readlines');
const fs = require('fs');


exports.sensorData = (req, res)=> {

    const liner = new lineByLine('E:/carbon_credit(localBlockchain)/server/controller/sens_data.txt');
      let co2lvl = 0;
      
        
      while(line = liner.next()){
          let cred = parseFloat(line);
        //   count += 1;
          if(cred > 70){
              co2lvl += (cred - 70);
  
          }
      }
    
      fs.truncate('E:/carbon_credit(localBlockchain)/server/controller/sens_data.txt', 0, function(){console.log('done')})
      let sco2 = co2lvl.toString(); 
      let sch4 = (co2lvl/3).toString();
      let sn2o = (co2lvl/ 25).toString();
      let shfc = (co2lvl/ 100).toString();
      let spfc = (co2lvl/ 500).toString();
      let ssf6 = (co2lvl/ 1000).toString(); 
      let calcCredit = (parseFloat(co2lvl) + (25 * parseFloat(sch4)) + (298 * parseFloat(sn2o)) + (1430 * parseFloat(shfc)) + (7390 * parseFloat(spfc)) + (22800 * parseFloat(ssf6)))/1000;
       let calcS = calcCredit.toString();
       let availCredit = (1000 - calcCredit);
       let avails = availCredit.toString();
       return res.status(200).json(
        {
            co2: sco2,
            ch4: sch4,
            n2o: sn2o,
            hfc: shfc,
            pfc: spfc,
            sf6: ssf6,
            calculated: calcS,
            available: avails

            
        }
       )
}