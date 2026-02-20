/**
 * CarKit Fitment Selector — Cascading Dropdown Logic
 * Order: Make → Model → Year → Variant
 */

(function() {
  'use strict';

  var fitmentData = {
    makes: ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Porsche'],
    models: {
      'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'M3', 'M4'],
      'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'AMG GT'],
      'Audi': ['A4', 'A6', 'Q5', 'Q7', 'RS5', 'e-tron'],
      'Toyota': ['Camry', 'RAV4', 'Corolla', 'Highlander', 'Supra'],
      'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Type R'],
      'Ford': ['Mustang', 'F-150', 'Explorer', 'Bronco'],
      'Chevrolet': ['Camaro', 'Corvette', 'Silverado', 'Tahoe'],
      'Porsche': ['911', 'Cayenne', 'Macan', 'Taycan']
    },
    years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
    variants: {
      '3 Series': ['320i', '330i', '340i', 'M340i'],
      '5 Series': ['530i', '540i', 'M550i'],
      'X3': ['sDrive30i', 'xDrive30i', 'M40i'],
      'X5': ['xDrive40i', 'xDrive45e', 'M50i'],
      'M3': ['Base', 'Competition', 'CS'],
      'M4': ['Base', 'Competition', 'CSL'],
      'C-Class': ['C300', 'C300 4MATIC', 'AMG C43', 'AMG C63'],
      'E-Class': ['E350', 'E450', 'AMG E53', 'AMG E63 S'],
      'A4': ['40 TFSI', '45 TFSI quattro', 'S4'],
      'Q5': ['40 TFSI', '45 TFSI quattro', 'SQ5'],
      'Camry': ['LE', 'SE', 'XLE', 'XSE', 'TRD'],
      'Civic': ['LX', 'Sport', 'EX', 'Touring'],
      'Mustang': ['EcoBoost', 'GT', 'Mach 1', 'Shelby GT500'],
      '911': ['Carrera', 'Carrera S', 'Turbo', 'Turbo S', 'GT3']
    }
  };

  function populateSelect(selectEl, options, placeholder) {
    selectEl.innerHTML = '<option value="">' + placeholder + '</option>';
    options.forEach(function(opt) {
      var option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      selectEl.appendChild(option);
    });
    selectEl.disabled = false;
  }

  function resetSelect(selectEl, placeholder) {
    selectEl.innerHTML = '<option value="">' + placeholder + '</option>';
    selectEl.disabled = true;
  }

  document.addEventListener('DOMContentLoaded', function() {
    var makeEl = document.getElementById('fitment-make');
    var modelEl = document.getElementById('fitment-model');
    var yearEl = document.getElementById('fitment-year');
    var variantEl = document.getElementById('fitment-variant');
    var checkBtn = document.getElementById('fitment-check');

    if (!makeEl || !modelEl || !yearEl || !variantEl) return;

    populateSelect(makeEl, fitmentData.makes, 'Select Make');
    resetSelect(modelEl, 'Select Model');
    resetSelect(yearEl, 'Select Year');
    resetSelect(variantEl, 'Select Variant');

    window.updateFitmentModels = function() {
      var make = makeEl.value;
      resetSelect(modelEl, 'Select Model');
      resetSelect(yearEl, 'Select Year');
      resetSelect(variantEl, 'Select Variant');

      if (make && fitmentData.models[make]) {
        populateSelect(modelEl, fitmentData.models[make], 'Select Model');
      }
    };

    window.updateFitmentYearVariant = function() {
      var model = modelEl.value;
      resetSelect(yearEl, 'Select Year');
      resetSelect(variantEl, 'Select Variant');

      if (model) {
        populateSelect(yearEl, fitmentData.years, 'Select Year');
        if (fitmentData.variants[model]) {
          populateSelect(variantEl, fitmentData.variants[model], 'Select Variant');
        }
      }
    };

    window.updateFitmentVariants = function() {
      var model = modelEl.value;
      resetSelect(variantEl, 'Select Variant');

      if (model && fitmentData.variants[model]) {
        populateSelect(variantEl, fitmentData.variants[model], 'Select Variant');
      }
    };

    if (checkBtn) {
      checkBtn.addEventListener('click', function() {
        var make = makeEl.value;
        var model = modelEl.value;
        var year = yearEl.value;
        var variant = variantEl.value;

        if (!make || !model) {
          alert('Please select at least Make and Model.');
          return;
        }

        var vehicle = (year ? year + ' ' : '') + make + ' ' + model + (variant ? ' ' + variant : '');
        window.location.href = '/collections/all?fitment=' + encodeURIComponent(vehicle);
      });
    }
  });
})();
