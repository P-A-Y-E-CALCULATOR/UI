const form = document.getElementById("form");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const period = getRadio("period");
    const basicSalary = parseInt(document.getElementById("salary").value);
    const benefits =parseInt(document.getElementById("benefits").value);
    const isDeductNssf = parseInt(getRadio("nssf"));
    const isNewNssfRates =parseInt(getRadio("isnew-nssf"));

    let results = calculate(period,basicSalary,benefits,isDeductNssf,isNewNssfRates);
    // Inserting Values
    document.getElementById("net-pay").innerHTML = "Ksh: "+results.netPay;
    document.getElementById("gross").innerHTML = "Ksh: "+results.gross;
    document.getElementById("nssf-rate").innerHTML = `Ksh: ${results.nssf}`;
    document.getElementById("taxable").innerHTML = "Ksh: "+results.taxable;
    document.getElementById("relief").innerHTML = "Ksh: "+results.relief;
    document.getElementById("nhif").innerHTML = "Ksh: "+results.nhif;
    document.getElementById("paye").innerHTML = "Ksh: "+results.paye;
    document.getElementById("net-pay-1").innerHTML = "Ksh: "+results.netPay;
    

    console.log(isNewNssfRates);
})
function getRadio(name){
    let ele = document.getElementsByName(name);
    for (let i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            return ele[i].value;
        }
        
    }
}
function calculate(period,basicSalary,benefits,isDeductNssf,isNewNssfRates){
    let gross = basicSalary+benefits;
    let relief;
    let nhif;
    let paye;
    let netPay;
    let taxable;
    let nssf = 0.0;
    
    if(period === "month"){
        relief = 1200;
        nhif = 1000;
        if(isDeductNssf){
            if(isNewNssfRates){
                nssf = 500
                taxable = gross-(nssf+nhif-relief);
                
            }
            else{
                nssf = 200;
                taxable = gross-(nssf+nhif-relief);
            }
        }
        else{
            taxable = gross-(nhif-relief);
        }
    }
    else{
        relief = 14400;
        nhif = 12000;
        
        if(isDeductNssf){
            if(isNewNssfRates === true){
                nssf = 6000
                taxable = gross-(nssf+nhif-relief);
            }
            else{
                nssf = 2400;
                taxable = gross-(nssf+nhif-relief);
            }
        }
        else{
            taxable = gross-(nhif-relief);
        }
    }
    paye = taxable*0.16;
    netPay = taxable - paye;
return {
    gross,
    nssf,
    taxable,
    relief,
    nhif,
    paye,
    netPay
}
}