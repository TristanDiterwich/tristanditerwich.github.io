//Important inforamtion:
//comb08: MPG
//co2TailpipeGpm: emmisions (grams per mile)
//combE: kWh/100miles  

var brands = Object.keys(vehicles.icev);

brands.sort();

for (var i = 0; i < brands.length; i++){
    $('#carBrandDropdown .dropdown-menu').append("<a class='dropdown-item' href='#' onclick='selectedCarBrand(\"" + brands[i] + "\")'>" + brands[i] + "</a>");
};

function selectedCarBrand(brand) {
    selectedCarData = undefined
    var models = Object.keys(vehicles.icev[brand]);        
    models.sort();
    $('#modelDropdown .dropdown-menu').empty();
    for (var i = 0; i < models.length; i++){
        $('#modelDropdown .dropdown-menu').append("<a class='dropdown-item' href='#' onclick='selectedCarModel(\"" + brand + "\",\"" + models[i] + "\")'>" + models[i] + "</a>");   
    } 
    $('#modelDropdown').show();
    $('#dropdownMenuButtonBrand').text(brand);
    $('#dropdownMenuButtonModel').text("your ICE car's model");
    $('#buildYearDropdown').hide();
    calculate();
}

function selectedCarModel(brand, model) {
    selectedCarData = undefined
    var buildYears = Object.keys(vehicles.icev[brand][model]);
    buildYears.sort();
    $('#buildYearDropdown .dropdown-menu').empty();
    for (var i = 0; i < buildYears.length; i++){
        $('#buildYearDropdown .dropdown-menu').append("<a class='dropdown-item' href='#' onclick='selectedCarBuildYear(\"" + brand + "\",\"" + model + "\",\"" + buildYears[i] + "\")'>" + buildYears[i] + "</a>");   
    }
    $('#buildYearDropdown').show();
    $('#dropdownMenuButtonModel').text(model);
    $('#dropdownMenuButtonYear').text("and your ICE car's build year");
    calculate();
}

function selectedCarBuildYear(brand, model, buildYear) {
    selectedCarData = vehicles.icev[brand][model][buildYear];
    console.log(selectedCarData);
    $('#dropdownMenuButtonYear').text(buildYear);
    calculate(); 
}

var selectedCarData;

var selectedCarDataEV;

var brandsEV = Object.keys(vehicles.ev);
brandsEV.sort();
for (var i = 0; i < brandsEV.length; i++){
    $('#carBrandEVDropdown .dropdown-menu').append("<a class='dropdown-item' href='#' onclick='selectedCarBrandEV(\"" + brandsEV[i] + "\")'>" + brandsEV[i] + "</a>");
};

function selectedCarBrandEV(brandEV) {
    var modelsEV = Object.keys(vehicles.ev[brandEV]);        
    modelsEV.sort();
    $('#modelEVDropdown .dropdown-menu').empty();
    for (var i = 0; i < modelsEV.length; i++){
        $('#modelEVDropdown .dropdown-menu').append("<a class='dropdown-item' href='#' onclick='selectedCarModelEV(\"" + brandEV + "\",\"" + modelsEV[i] + "\")'>" + modelsEV[i] + "</a>");   
    } 
    $('#modelEVDropdown').show();
    $('#dropdownMenuButtonBrandEV').text(brandEV);
}

function selectedCarModelEV(brandEV, modelEV) {
    var buildYearsEV = Object.keys(vehicles.ev[brandEV][modelEV]);
    buildYearsEV.sort();
    $('#buildYearEVDropdown .dropdown-menu').empty();
    for (var i = 0; i < buildYearsEV.length; i++){
        $('#buildYearEVDropdown .dropdown-menu').append("<a class='dropdown-item' href='#' onclick='selectedCarBuildYearEV(\"" + brandEV + "\",\"" + modelEV + "\",\"" + buildYearsEV[i] + "\")'>" + buildYearsEV[i] + "</a>");   
    }
    $('#buildYearEVDropdown').show();
    $('#dropdownMenuButtonModelEV').text(modelEV);
}

function selectedCarBuildYearEV(brand, model, buildYear) {
    selectedCarDataEV = vehicles.ev[brand][model][buildYear];
    console.log(selectedCarDataEV);
    $('#dropdownMenuButtonYearEV').text(buildYear);
    calculate();
}

var selectedYearlyKM

function selectedKM(km) {
    selectedYearlyKM = km;
    console.log(km);
    $('#dropdownMenuButtonKM').text(km + 'km');
    calculate();
}

var selectedYearsOwned

function selectedYears(years) {
    selectedYearsOwned = years;
    console.log(years);
    $('#dropdownMenuButtonYears').text(years + ' years');
    calculate();
}

$('#resultContainer').hide();
$('#recyclingContainer').hide();

function calculate() {
    if (selectedCarData && selectedCarDataEV && selectedYearlyKM && selectedYearsOwned) {
        var result = Math.round((6000) + (selectedYearlyKM * selectedYearsOwned) / (selectedCarData.mpg / 2.35 * 1.5) * 2.4);
        var resultEV = Math.round((10000) + (selectedYearlyKM * selectedYearsOwned) / (selectedCarDataEV.kwhPer100Miles / 1.6) * 0.4);
        var resultDifference = Math.round(resultEV / result * 100);
        console.log(result);
        console.log(resultEV);
        $('#result').text(result);
        $('#resultDifference').text(resultDifference);
        $('#resultEV').text(resultEV);
        $('#resultContainer').show();
        $('#recyclingContainer').show();
    }
    else {
        console.log("calculation cleared");
        $('#resultContainer').hide();
        $('#recyclingContainer').hide();
    }
}
