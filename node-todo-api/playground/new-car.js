const currentRubleValueAlfa = 38 + 127
    , currentRubleValueVTB = 0
    , newCarPrice = 1500
    , oformlenie = 20
    , dollarExchangePrice = 63.44
    , dollarAmount = 8.8
    , creditCardDept = 0
    , zadatok = 50
    , matovayaPlenka = 67
    , iluyaDept = 396
    , creditCardLimit = 650
    , zarplataKonezAprelya = 75
    , dolgOtIluiSZarplati = 30;

    const currentMoney = Math.floor(currentRubleValueAlfa + currentRubleValueVTB
    + (dollarExchangePrice * dollarAmount) - creditCardDept + creditCardLimit
    - newCarPrice + zadatok - matovayaPlenka - oformlenie);


console.log(currentMoney);




