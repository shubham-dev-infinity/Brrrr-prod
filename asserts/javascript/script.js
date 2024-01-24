$(".custom-select").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {
          template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
    template += '</div></div>';
    
    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
  });
  $(".custom-select-trigger").on("click", function() {
    $('html').one('click',function() {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function() {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
  });









const label = document.querySelector(".dropdown__filter-selected");
const options = Array.from(
	document.querySelectorAll(".dropdown__select-option")
);

options.forEach((option) => {
	option.addEventListener("click", () => {
		label.textContent = option.textContent;
	});
});

// Close dropdown onclick outside
document.addEventListener("click", (e) => {
	const toggle = document.querySelector(".dropdown__switch");
	const element = e.target;

	if (element == toggle) return;

	const isDropdownChild = element.closest(".dropdown__filter");

	if (!isDropdownChild) {
		toggle.checked = false;
	}
});



// $(document).ready(function () {
//     $('select').niceSelect();
//     // $("html").niceScroll();	
//     // $(".list").niceScroll();
//     $('.xyz').on('click', function () {
  
//       event();
//     });
//   });

  

$(document).ready(function () {
    // $("body").on('input', '#interest_rate, #management_fees_amount, #refinanced_interest_rate, #refinanced_loan', function () {
    //     var inputElement = $(this)[0]; // Get the DOM element

    //     // Get the current cursor position
    //     var cursorPosition = inputElement.selectionStart;

    //     // Get the input value
    //     var inputValue = $(this).val();

    //     // Check if the value already ends with '%'
    //     if (!inputValue.endsWith('%')) {
    //         // Update the input value with '%' appended
    //         $(this).val(inputValue + '%');

    //         // Set the cursor position before the '%'
    //         inputElement.setSelectionRange(cursorPosition, cursorPosition);
    //     }
    // });


    // Use a more general selector for the event binding
      $("body").on('input', '.amountInput', function () {
        var inputElement = this;
        var originalCursorPosition = inputElement.selectionStart;
    
        // Get the numeric value without non-numeric characters
        var numericValue = parseFloat($(this).val().replace(/[^0-9.-]/g, ''));
        // Check if the numeric value is NaN (not a number)
        if (isNaN(numericValue)) {
            // If NaN, set the input value to an empty string and exit the function
            $(this).val('');
            return;
        }    
        // Get the input value before formatting
        var originalInputValue = $(this).val();
    
        // Format the numeric value with the '$' sign
        var formattedValue = '$' + numericValue.toLocaleString();
    
        // Check if the numeric value is 0 after deleting the first digit
        if (numericValue === 0 && originalInputValue.indexOf('0') === 1) {
            // Revert to the original input value and keep the cursor position
            $(this).val(originalInputValue);
            inputElement.setSelectionRange(originalCursorPosition, originalCursorPosition);
            return;
        }
    
        // Calculate the change in length due to formatting
        var lengthDiff = formattedValue.length - originalInputValue.length;
    
        // Update the input value
        $(this).val(formattedValue);
    
        // Calculate the new cursor position
        var newCursorPosition = originalCursorPosition + lengthDiff;
    
        // Set the cursor position after updating the input
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);


            $(this).val(formattedValue);
            totalCashRequired();
            updateDiscount();
            loanEstablishedExpense();
            propertyManagementFees();
            calculateRenovationCost();
            calculatePMT();
            loanExpenses();
             propertyRenovationFees();
             annualRepaymentAmount();
            annualRepaymentAmountAsPurchased();
            UpliftCalculation();
            RefinancedCalculation();
            updateGraph(0.05);
            updateGraph(0.07);
            updateGraph(0.1);
        
    });
         function updateDiscount() {
        var marketValue = parseFloat($('#market-value').val().replace(/[^0-9.-]/g, '')) || 0;
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#widget-purchase-price').text('$' + purchasePrice.toLocaleString());
        if (marketValue > purchasePrice) {
            var discountAmount = marketValue - purchasePrice;
            var discountPercentage = marketValue !== 0 ? (discountAmount / marketValue) * 100 : 0;
            discountPercentage = (discountPercentage * 100) / 100;
            $('#discount-percent').text(discountPercentage.toFixed(2) + '%');
            discountAmount = (discountAmount * 100) / 100;
            $('#discount-price').text('$' + discountAmount.toLocaleString());
            $('.discount').show();
            $('.overprice').hide();
            $('#result-message').hide();
        } else if (marketValue < purchasePrice) {
            var overpricedAmount = purchasePrice - marketValue;
            var overpricedPercentage = marketValue !== 0 ? (overpricedAmount / marketValue) * 100 : 0;
            overpricedPercentage = (overpricedPercentage * 100) / 100;
            $('#overpriced-percent').text(overpricedPercentage.toFixed(2) + '%');
            overpricedAmount = (overpricedAmount * 100) / 100;
            $('#overpriced-price').text('$' + overpricedAmount.toLocaleString());
            $('.overprice').show();
            $('.discount').hide();
            $('#result-message').hide();
        }
        else {
            $('#result-message').show();
            $('#result-message').text("Purchasing at Market Price");
            $('.overprice').hide();
            $('.discount').hide();
        }
         loanExpenses();
        loanEstablishedExpense();
    }
        var totalCash=0;
    function totalCashRequired() {

        // Get the values of 'totalcash Value' and 'Purchase Price'
        var downpayment = parseFloat($('#down-payment').val().replace(/[^0-9.-]/g, '')) || 0;
        // var totalAmountLabel = document.querySelector('#property-improvements');
        // var propertyImprovement = parseFloat(totalAmountLabel.textContent.replace(/[^0-9.-]/g, ''));
          var propertyImprovement = totalRenovationCost;
        var legals = parseFloat($('#legals').val().replace(/[^0-9.-]/g, '')) || 0;
        var stampDutyCalculators = parseFloat($('#stamp-duty-calculator').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherCosts = parseFloat($('#other-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        var buyerAgentFees = parseFloat($('#buyer-agent-fees').val().replace(/[^0-9.-]/g, '')) || 0;

        // Calculate the Total Cash Required

        var totalCashRequired = downpayment + propertyImprovement + legals + stampDutyCalculators + otherCosts + buyerAgentFees;
        totalCash = totalCashRequired;
        $('#total-cash-required').text('$' + totalCashRequired.toLocaleString());
        $('#widget-cash-required').text('$' + totalCashRequired.toLocaleString());
         loanEstablishedExpense();
        loanExpenses();
    }
    
    var totalPurchasePrice=0;
    //Funtion to update Loan Establishment Requirement
     function loanEstablishedExpense() {
        var loanEstablishedFees = parseFloat($('#loan-establishment-fee').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyValuation = parseFloat($('#property-valuation').val().replace(/[^0-9.-]/g, '')) || 0;
        var lenderMortgageInsurance = parseFloat($('#lender-mortgage-insurance').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherLoanCosts = parseFloat($('#other-loan-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        // Format the values with '$' and commas
        // $('#market-value').val(formatCurrency(marketValue));
        // $('#loan-establishment-fee').val((loanEstablishedFees));

        var totalExpensesAmount = loanEstablishedFees + propertyValuation + lenderMortgageInsurance + otherLoanCosts;

        $('#total-expenses-amount').text('$' + totalExpensesAmount.toLocaleString());

        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
         var totalAmountLabel = document.querySelector('#property-improvements');
        var totalAmount = parseFloat(totalAmountLabel.textContent.replace(/[^0-9.-]/g, ''));
        var propertyImprovement = totalAmount;
        var legals = parseFloat($('#legals').val().replace(/[^0-9.-]/g, '')) || 0;
        var stampDutyCalculators = parseFloat($('#stamp-duty-calculator').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherCosts = parseFloat($('#other-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        var buyerAgentFees = parseFloat($('#buyer-agent-fees').val().replace(/[^0-9.-]/g, '')) || 0;

        var total = purchasePrice + propertyImprovement + legals + stampDutyCalculators + otherCosts + buyerAgentFees;

        totalPurchasePrice = totalExpensesAmount + total;
        console.log(totalPurchasePrice);
        $('#total-purchasePrice').text('$' + totalPurchasePrice.toLocaleString());

         loanExpenses();

    }

    var total=0;
    function propertyManagementFees() {

        var weeklyRent = parseFloat($('#purchased_weekly_rent').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#purchased_monthly_rent').text('$' + Math.round(weeklyRent * 4.3).toLocaleString());

        var annualRent = Math.round(weeklyRent * 52);
        $('#purchased_annual_rent').text('$' + annualRent.toLocaleString());

        console.log("Annual" + annualRent);

        var propertyfeesRate = parseFloat($('#management_fees_amount').val()) || 0;
        $('#management_fees').text('$' + Math.round((weeklyRent * propertyfeesRate * 52) / 100).toLocaleString());


        var pmf = (weeklyRent * propertyfeesRate * 52) / 100;
        var rates = parseFloat($('#rate_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var buildingInsuranceAmt = parseFloat($('#building_insurance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var landloardInsuranceAmt = parseFloat($('#landlord_insurance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var startaFees = parseFloat($('#strata_fees_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var landTaxAmt = parseFloat($('#land_tax_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var MaintainanceAmt = parseFloat($('#maintenance_amount').val().replace(/[^0-9.-]/g, '')) || 0;

        total = pmf + rates + buildingInsuranceAmt + landloardInsuranceAmt + startaFees + landTaxAmt + MaintainanceAmt;
        console.log(total);
        $('#total-amount').text('$' + Math.round(total).toLocaleString());
         loanExpenses();
        annualRepaymentAmountAsPurchased();

    }
    
    // Function to calculate PMT
    function calculatePMT(annualRate, loanTerm, principal) {
        var monthlyRate = annualRate / 12 / 100; // to convert the annual interest rate from a percentage to a decimal
        console.log('monthly rate:', monthlyRate);
        var numberOfPayments = loanTerm * 12; // Convert loan term to number of payments

        // Calculate PMT using the formula
        var pmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Return the calculated monthly payment with two decimal places
        // Check if the result is a valid number
        if (!isNaN(parseFloat(pmt)) && isFinite(pmt)) {
            console.log('pmt:', pmt);
            // Return the calculated monthly payment with two decimal places
            return pmt;
        } else {
            console.log('Invalid result for PMT calculation');
            // Return 0.00 or any default value in case of an invalid result
            return '0';
        }
    }

    //Loan Expenses
    var interestOnly;
    var principleInterest;
    var totalFundBorrowed;
    function loanExpenses() {

        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        var downpayment = parseFloat($('#down-payment').val().replace(/[^0-9.-]/g, '')) || 0;

        var loanEstablishedFees = parseFloat($('#loan-establishment-fee').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyValuation = parseFloat($('#property-valuation').val().replace(/[^0-9.-]/g, '')) || 0;
        var lenderMortgageInsurance = parseFloat($('#lender-mortgage-insurance').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherLoanCosts = parseFloat($('#other-loan-costs').val().replace(/[^0-9.-]/g, '')) || 0;

        totalFundBorrowed = purchasePrice - downpayment + (loanEstablishedFees + propertyValuation + lenderMortgageInsurance + otherLoanCosts)

        $('#fund-borrowed-amount').text('$' + Math.round(totalFundBorrowed).toLocaleString());


        // Monthly Repayments
        var principal = totalFundBorrowed; // Replace this with your actual principal amount
        var annualRate = parseFloat($('#interest_rate').val().replace(/[^0-9.-]/g, '')) || 0;
        console.log("annual rate :", annualRate);
        console.log("principal val :", principal);
        var loanTerm = 30; // Replace this with your actual loan term in years

        var monthlyPayment = calculatePMT(annualRate, loanTerm, principal);
        console.log('Monthly Payment:', '$' + monthlyPayment);

        //  update the value in your  element
        $('#monthly-repayment-amount').text('$' + Math.round(monthlyPayment).toLocaleString());

        // Annual Repayments
        var annualPayment = monthlyPayment * 12;
        console.log("annualPayment:", annualPayment);
        $('#annual-repayment-amount').text('$' + Math.round(annualPayment).toLocaleString());

        //INTEREST ONLY (I/O)
        // Annual Repayments (INTEREST)
        interestAnnualPayment = totalFundBorrowed * annualRate / 100;
        console.log("interestAnnualPayment:", interestAnnualPayment);
        $('#interest_annual_repayment_amount').text('$' + Math.round(interestAnnualPayment).toLocaleString());

        //LVR (Loan-to-Value Ratio)
        var lvr = (totalFundBorrowed / purchasePrice) * 100;
        console.log("lvr :", lvr);

        if (isNaN(lvr)) {
            $('#lvr_amount').text('0%');
            $('#widget-lvr').text('0%');
        } else {
            $('#lvr_amount').text(lvr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
            $('#widget-lvr').text(lvr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }

        //Total Expenses when Interest on P&I
        console.log('total:', total);
        principleInterest = annualPayment + total
        console.log("principleInterest:", principleInterest);
        if (isNaN(principleInterest)) {
            $('#principle-interest-amount').text('$0');
            $('#widget-expenses-io').text('$0');
        } else {
            $('#principle-interest-amount').text('$' + Math.round(principleInterest).toLocaleString());
            $('#widget-expenses-io').text('$' + Math.round(interestOnly).toLocaleString());
        }

        //Total Expenses when Interest on I/O
        interestOnly = interestAnnualPayment + total
        console.log("interestOnly :", interestOnly);
        if (isNaN(interestOnly)) {
            $('#interest-only-amount').text('$0');
        } else {
            $('#interest-only-amount').text('$' + Math.round(interestOnly).toLocaleString());
        }
        
    }
    
    var totalRenovationCost = 0;
    function calculateRenovationCost() {
        var internalPainting = parseFloat($('#internal_painting').val().replace(/[^0-9.-]/g, '')) || 0;
        var externalPainting = parseFloat($('#external_painting').val().replace(/[^0-9.-]/g, '')) || 0;
        var flooring = parseFloat($('#flooring').val().replace(/[^0-9.-]/g, '')) || 0;
        var roof = parseFloat($('#roof').val().replace(/[^0-9.-]/g, '')) || 0;
        var fittingFixtures = parseFloat($('#fitting_fixtures').val().replace(/[^0-9.-]/g, '')) || 0;
        var lighting = parseFloat($('#lighting').val().replace(/[^0-9.-]/g, '')) || 0;
        var curtains_windows = parseFloat($('#curtains_windows').val().replace(/[^0-9.-]/g, '')) || 0;
        var landscaping = parseFloat($('#landscaping').val().replace(/[^0-9.-]/g, '')) || 0;
        var kitchen = parseFloat($('#kitchen').val().replace(/[^0-9.-]/g, '')) || 0;
        var bathroom = parseFloat($('#bathroom').val().replace(/[^0-9.-]/g, '')) || 0;
        var fencing = parseFloat($('#fencing').val().replace(/[^0-9.-]/g, '')) || 0;
        var other_costs = parseFloat($('#other_costs').val().replace(/[^0-9.-]/g, '')) || 0;
        totalRenovationCost = internalPainting + externalPainting + flooring + roof + fittingFixtures + lighting + curtains_windows + landscaping + kitchen + bathroom + fencing + other_costs;
        console.log(totalRenovationCost);
        $('#total_renovation_cost').text('$' + totalRenovationCost.toLocaleString());
        $('#property-improvements').text('$' + totalRenovationCost.toLocaleString());
        $('#widget-renovation-cost').text('$' + Math.round(totalRenovationCost).toLocaleString());
         loanEstablishedExpense();
        totalCashRequired();
    }
    //Need to test
   var LVR=0;
    function UpliftCalculation() {
        var marketValue = parseFloat($('#market-value').val().replace(/[^0-9.-]/g, '')) || 0;
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        var downPayment = parseFloat($('#down-payment').val().replace(/[^0-9.-]/g, '')) || 0;
        
        var loanEstablishedFees = parseFloat($('#loan-establishment-fee').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyValuation = parseFloat($('#property-valuation').val().replace(/[^0-9.-]/g, '')) || 0;
        var lenderMortgageInsurance = parseFloat($('#lender-mortgage-insurance').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherLoanCosts = parseFloat($('#other-loan-costs').val().replace(/[^0-9.-]/g, '')) || 0;

        var postRevolutionValue = parseFloat($('#post_renovation_val').val().replace(/[^0-9.-]/g, '')) || 0;
        var refinedLoanOn = parseFloat($('#refinanced_loan').val().replace(/[^0-9.-]/g, '')) || 0;
        var exixtingLoan = purchasePrice - downPayment + (loanEstablishedFees + propertyValuation + lenderMortgageInsurance + otherLoanCosts);
        LVR = postRevolutionValue * (refinedLoanOn/100);
        
        var valueAdd = postRevolutionValue-purchasePrice;
        var equityRealese = LVR - exixtingLoan;
        
        $('#uplift_purchase_price').text('$' + purchasePrice.toLocaleString());
        $('#existing_loan').text('$' + exixtingLoan.toLocaleString());
        $('#uplift_lvr').text('$' + LVR.toLocaleString());
        $('#fund-refinanced').text('$' + LVR.toLocaleString());
        $('#value_add').text('$' + valueAdd.toLocaleString());
        $('#equity_release').text('$' + equityRealese.toLocaleString());
        if (valueAdd >= 0) {
            // Do Something
            $('#widget-value-add').text('+' + Math.round(valueAdd).toLocaleString());
        }else{
            $('#widget-value-add').text(Math.round(valueAdd).toLocaleString());
        }
        
        $('#widget-equity-io').text('$' + Math.round(equityRealese).toLocaleString());
    }
    
     function annualRepaymentAmount() {
        //   ---as Renovated and refinanced----
        var annualRentText = $('#annual_rent').text();
        var annualRentValue = parseFloat(annualRentText.replace(/[^0-9.-]+/g, ""));
        console.log(annualRentValue);
        // var principalInterestText = $('#principle-interest-amount-refinanced').text();
        // var principalInterestValue = parseFloat(principalInterestText.replace(/[^0-9.-]+/g, ""));
         var principalInterestValue = localExpenses_pi;
        console.log("principalInterestValue" + principalInterestValue);

        var piAmount = annualRentValue - principalInterestValue;

        $('#asRenovated-p-i-amount').text('$' + Math.round(piAmount).toLocaleString());
        console.log("piAmount" + piAmount);
        $('#widget-profit-pi').text('$' + Math.round(piAmount).toLocaleString());
        
        //-----ioAmount------// 
        // var principalInterestTextRef = $('#interest-only-amount-refinanced').text();
        // var interestOnlyRefinanced = parseFloat(principalInterestTextRef.replace(/[^0-9.-]+/g, ""));
        var interestOnlyRefinanced = localExpenses_io;
        var ioAmount = annualRentValue - interestOnlyRefinanced;

        $('#asRenovated-ioAmount').text('$' + Math.round(ioAmount).toLocaleString());
        console.log("ioAmount" + ioAmount);

        var grossYield = (annualRentValue / totalPurchasePrice) * 100;
        if (isNaN(grossYield)) {
            $('#asRenovated-grossYield').text('0%');
        } else {
            $('#asRenovated-grossYield').text(grossYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }

        console.log(grossYield);

        // ------cash on cash yield(p&i)-------//
        var cashYield_pi = (piAmount / totalCash) * 100;

        if (isNaN(cashYield_pi)) {
            $('#asRenovated-cashYield-pi').text('0%');
        } else {
            $('#asRenovated-cashYield-pi').text(cashYield_pi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
        console.log("cashYield_pi:" + cashYield_pi);

        //------- cash on cash yield(i/0)--------//
        var cashYield_io = (ioAmount / totalCash) * 100;
        if (isNaN(cashYield_io)) {
            $('#asRenovated-cashYield-io').text('0%');
        } else {
            $('#asRenovated-cashYield-io').text(cashYield_io.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
        console.log("cashYield_io:" + cashYield_io);
        //------- Return on equity--------//
        //------- Growth Rate@5%--------//
        var postRenovationValue = parseFloat($('#post_renovation_val').val().replace(/[^0-9.-]/g, '')) || 0;
        
        var growthRate = (ioAmount + 0.05 * postRenovationValue) / totalCash * 100;
        console.log("Growth Rate" + growthRate);
        
        if (isNaN(growthRate)) {
            $('#asRenovated-growth-rate').text('0%');
            $('#widget-return-equity').text('0%');
        } else {
            $('#asRenovated-growth-rate').text(growthRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
            $('#widget-return-equity').text(growthRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
        //------- Growth Rate@7%--------//

        var growthRate_7 = (ioAmount + 0.07 * postRenovationValue) / totalCash * 100;

        if (isNaN(growthRate_7)) {
            $('#asRenovated-growth-rate-7').text('0%');
        } else {
            $('#asRenovated-growth-rate-7').text(growthRate_7.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }

        //------- Growth Rate@10%--------//

        var growthRate_10 = (ioAmount + 0.1 * postRenovationValue) / totalCash * 100;

        if (isNaN(growthRate_10)) {
            $('#asRenovated-growth-rate-10').text('0%');
        } else {
            $('#asRenovated-growth-rate-10').text(growthRate_10.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }

    }
    // -------as Purchased-------//
    function annualRepaymentAmountAsPurchased() {
        //    principle-interest-amount
        var annualRentText = $('#purchased_annual_rent').text();
        var annualRentValue = parseFloat(annualRentText.replace(/[^0-9.-]+/g, ""));
        console.log(annualRentValue);
        var piAmount = annualRentValue - principleInterest;

        $('#asPurchased-p-i-amount').text('$' + Math.round(piAmount).toLocaleString());
        console.log("piAmount" + piAmount);
        $('#widget-profit-pi').text('$' + Math.round(piAmount).toLocaleString());
        //-----ioAmount------//
        var ioAmount = annualRentValue - interestOnly;

        $('#asPurchased-ioAmount').text('$' + Math.round(ioAmount).toLocaleString());
        console.log("ioAmount" + ioAmount);

        var grossYield = (annualRentValue / totalPurchasePrice) * 100;
        if (isNaN(grossYield)) {
            $('#asPurchased-grossYield').text('0%');
        } else {
            $('#asPurchased-grossYield').text(grossYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }

        console.log(grossYield);

        // ------cash on cash yield(p&i)-------//
        var cashYield_pi = (piAmount / totalCash) * 100;

        if (isNaN(cashYield_pi)) {
            $('#asPurchased-cashYield-pi').text('0%');
        } else {
            $('#asPurchased-cashYield-pi').text(cashYield_pi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
        console.log("cashYield_pi:" + cashYield_pi);

        //------- cash on cash yield(i/0)--------//
        var cashYield_io = (ioAmount / totalCash) * 100;
        if (isNaN(cashYield_io)) {
            $('#asPurchased-cashYield-io').text('0%');
        } else {
            $('#asPurchased-cashYield-io').text(cashYield_io.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
        console.log("cashYield_io:" + cashYield_io);
        //------- Return on equity--------//
        //------- Growth Rate@5%--------//
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        console.log("PurcxhasePrice:" + purchasePrice);
        var growthRate = (ioAmount + 0.05 * purchasePrice) / totalCash * 100;
        console.log("Growth Rate" + growthRate);
        var growthRate = ((ioAmount + (0.05 * purchasePrice)) / totalCash) * 100;
        console.log("Growth Rate2" + growthRate);
        if (isNaN(growthRate)) {
            $('#asPurchased-growth-rate').text('0%');
            $('#widget-return-equity').text('0%');
        } else {
            $('#asPurchased-growth-rate').text(growthRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
            $('#widget-return-equity').text(growthRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
        //------- Growth Rate@7%--------//

        var growthRate_7 = (ioAmount + 0.07 * purchasePrice) / totalCash * 100;

        if (isNaN(growthRate_7)) {
            $('#asPurchased-growth-rate-7').text('0%');
        } else {
            $('#asPurchased-growth-rate-7').text(growthRate_7.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }

        //------- Growth Rate@10%--------//

        var growthRate_10 = (ioAmount + 0.1 * purchasePrice) / totalCash * 100;

        if (isNaN(growthRate_10)) {
            $('#asPurchased-growth-rate-10').text('0%');
        } else {
            $('#asPurchased-growth-rate-10').text(growthRate_10.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }
    }
 var localExpenses_io = 0;
    var localExpenses_pi = 0;
    function RefinancedCalculation() {
        console.log("ho");
        var annualRate = parseFloat($('#refinanced_interest_rate').val().replace(/[^0-9.-]/g, '')) || 0;
        var loanTerm = 30; // Replace this with your actual loan term in years
        var postRevolutionValue = parseFloat($('#post_renovation_val').val().replace(/[^0-9.-]/g, '')) || 0;
        var refinedLoanOn = parseFloat($('#refinanced_loan').val().replace(/[^0-9.-]/g, '')) || 0;
        var LVR = postRevolutionValue * (refinedLoanOn/100);
        var principal = LVR; // Replace this with your actual principal amount
        var monthlyPayment =  calculatePMT(annualRate, loanTerm, principal);
        $('#refinanced-monthly-repayment').text('$' + Math.round(monthlyPayment).toLocaleString());

       // Annual Repayments
        var annualPayment = monthlyPayment * 12;
        
        $('#refinanced_annual_repayment').text('$' + Math.round(annualPayment).toLocaleString());
        
        //INTEREST ONLY (I/O)
        // Annual Repayments (INTEREST)
        var interestAnnualPayment = principal * annualRate/100;
       
        $('#interest_refinanced_annual_repayment').text('$' + Math.round(interestAnnualPayment).toLocaleString());
        
        //Total Expenses when Interest on P&I
        // var totalAmountLabel = document.querySelector('#total-amount');
        // var totalAmount = parseFloat(totalAmountLabel.textContent.replace(/[^0-9.-]/g, ''));
        var totalAmount = total;
        // Get the element by its class name


       
         localExpenses_pi = annualPayment+totalAmount;
        $('#principle-interest-amount-refinanced').text('$' + Math.round(localExpenses_pi).toLocaleString());
        
        localExpenses_io = interestAnnualPayment+totalAmount;
        $('#interest-only-amount-refinanced').text('$' + Math.round(localExpenses_io).toLocaleString());
        

        
    }
    
    function propertyRenovationFees() {

        var renovationweeklyRent = parseFloat($('#weekly_rent').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#monthly_rent').text('$' + Math.round(renovationweeklyRent * 4.3).toLocaleString());

        var renovationannualRent = Math.round(renovationweeklyRent * 52);
        console.log('renovationweeklyRent:', renovationweeklyRent);
        $('#annual_rent').text('$' + renovationannualRent.toLocaleString());

    }
    // Event handler for changes in 'Purchase Price'
    $('#purchase-price').on('input', function () {
        // Perform your calculation here (if needed)
        // handleNumericInput('#purchase-price');
        updateDiscount();
        UpliftCalculation();
        RefinancedCalculation();
        annualRepaymentAmount();
        annualRepaymentAmountAsPurchased();

    });

    // Event handler for changes in 'Market Value'
    $('#market-value').on('input', function () {
        // Perform your calculation here (if needed)
        // handleNumericInput('#market-value')
        updateDiscount();
        UpliftCalculation();
        RefinancedCalculation();
    });

    // Event handler for changes in 'Down PAyment Value'
    $('#down-payment').on('input', function () {
        // Perform your calculation here (if needed)
          totalCashRequired();
        UpliftCalculation();
        RefinancedCalculation();
        annualRepaymentAmount();
        annualRepaymentAmountAsPurchased();
    });

    // Event handler for changes in 'Property Improvements Value'
    $('#property-improvements').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'legals Value'
    $('#legals').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'stamp-duty-calculator Value'
    $('#stamp-duty-calculator').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in ' other-costs Value'
    $('#other-costs').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'buyer-agent-fees Value'
    $('#buyer-agent-fees').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'loan-establishment-fee Value'
    $('#loan-establishment-fee').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
          propertyRenovationFees();
        UpliftCalculation();
        RefinancedCalculation();
    });

    // Event handler for changes in 'property-valuation Value'
    $('#property-valuation').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
        UpliftCalculation();
        RefinancedCalculation();
    });

    // Event handler for changes in 'lender-mortgage-insurance Value'
    $('#lender-mortgage-insurance').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
        UpliftCalculation();
        RefinancedCalculation();
    });

    // Event handler for changes in 'other-loan-costs Value'
    $('#other-loan-costs').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
        UpliftCalculation();
        RefinancedCalculation();
    });

    // Event handler for changes in 'other-loan-costs Value'
    $('#post_renovation_val').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
        UpliftCalculation();
        RefinancedCalculation();
         updateGraph(0.05);
        updateGraph(0.07);
        updateGraph(0.1);
    });

    // Event handler for changes in 'other-loan-costs Value'
    $('#refinanced_loan').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
        UpliftCalculation();
        RefinancedCalculation();
        updateGraph(0.05);
        updateGraph(0.07);
        updateGraph(0.1);
        annualRepaymentAmount();
        annualRepaymentAmountAsPurchased();
    });

    // Event handler for changes in 'management_fees_amount Value'
    $('#management_fees_amount').on('input', function () {
        // Perform your calculation here (if needed)
        propertyManagementFees();
        loanExpenses();
        RefinancedCalculation();
        //annualRepaymentAmount();
    });

    // Event handler for changes in 'weekly_rent Value'
    $('#weekly_rent').on('input', function () {
        // Perform your calculation here (if needed)
        propertyManagementFees();
        propertyRenovationFees();
        annualRepaymentAmount();
        annualRepaymentAmountAsPurchased();
        loanExpenses();
        RefinancedCalculation();
        // Update for 5%
        updateGraph(0.05);

        // Update for 7%
        updateGraph(0.07);

        // Update for 10%
        updateGraph(0.1);

    });
     $('#land_tax_amount').on('input',function(){
        RefinancedCalculation();
        annualRepaymentAmount();
    })
    $('#rate_amount').on('input',function(){
        RefinancedCalculation();
        annualRepaymentAmount();
    })
    $('#building_insurance_amount').on('input',function(){
        RefinancedCalculation();
        annualRepaymentAmount();
    })
    $('#strata_fees_amount').on('input',function(){
        RefinancedCalculation();
        annualRepaymentAmount();
    })
    $('#land_tax_amount').on('input',function(){
        RefinancedCalculation();
        annualRepaymentAmount();
    })
    $('#maintenance_amount').on('input',function(){
        RefinancedCalculation();
        annualRepaymentAmount();
    })
  
    function updateGraph(percentage) {
         var postRenovationValue = parseFloat($('#post_renovation_val').val().replace(/[^0-9.-]/g, '')) || 0;
         var refinancedLoanText = $('#uplift_lvr').text();
        var refinancedLoanValue = parseFloat(refinancedLoanText.replace(/[^0-9.-]+/g, ""));
        console.log(refinancedLoanValue);
        // Create an array to store the updated data for the current dataset
        var newData = [];
        var newData2 = [];

        // Update the data based on the purchase price and percentage
        for (var n = 0; n <= 10; n++) {
            var updatedValue = postRenovationValue * Math.pow(1 + percentage, n);
            updatedValue = Math.round(updatedValue);
            var updatedValue2 = updatedValue - refinancedLoanValue ;
            newData.push(updatedValue);
            newData2.push(updatedValue2);

        }
        // var min = Math.min(...newData);
        // console.log("Min:"+min)
        // var max = Math.max(...newData);
        // console.log("Max:"+max)
        // var stepSize = Math.ceil((max - min) / 150); // Adjust as needed
        // console.log("stepSize:"+stepSize)
        // Set the new y-axis ticks configuration
        // myChart.options.scales.y.ticks.min = min;
        // myChart.options.scales.y.ticks.max = max;
        // myChart.options.scales.y.ticks.stepSize = stepSize;
        // myChart.options.scales.y.beginAtZero = true; 
        // equityGrowthChart.options.scales.y.ticks.min = min;
        // equityGrowthChart.options.scales.y.ticks.max = max;
        // equityGrowthChart.options.scales.y.ticks.stepSize = stepSize;
        // equityGrowthChart.options.scales.y.beginAtZero = true; 
        // Find the index of the dataset based on the percentage
        var datasetIndex;
        if (percentage === 0.1) {
            datasetIndex = 0;
        } else if (percentage === 0.07) {
            datasetIndex = 1;
        } else if (percentage === 0.05) {
            datasetIndex = 2;
        }

        // Update the data for the specific dataset
        myChart.data.datasets[datasetIndex].data = newData.slice();
        equityGrowthChart.data.datasets[datasetIndex].data = newData2.slice();
        var tooltipLabels = ['10%', '7%', '5%'];
        // var tooltipValues = [
        //     newData[tooltipLabels.indexOf('5%')],
        //     newData[tooltipLabels.indexOf('7.5%')],
        //     newData[tooltipLabels.indexOf('10%')],
        // ];
    
        // Set custom labels for each dataset
        myChart.data.datasets.forEach((dataset, index) => {
            dataset.label = tooltipLabels[index];
        });
    
        // Set custom tooltip content
        myChart.options.plugins.tooltip.callbacks.label = function (context) {
            var datasetLabel = myChart.data.datasets[context.datasetIndex].label || '';

            var value = context.parsed.y || 0;
            // Format the value with comma separator and "$" sign
            var formattedValue = '$' + value.toLocaleString();
            return datasetLabel + ': ' + formattedValue;
        };

         equityGrowthChart.data.datasets.forEach((dataset, index) => {
            dataset.label = tooltipLabels[index];
        });
    
        // Set custom tooltip content
        equityGrowthChart.options.plugins.tooltip.callbacks.label = function (context) {
            var datasetLabel = equityGrowthChart.data.datasets[context.datasetIndex].label || '';

            var value = context.parsed.y || 0;
           // Format the value with comma separator and "$" sign
           var formattedValue = '$' + value.toLocaleString();
           return datasetLabel + ': ' + formattedValue;
        };
        // Log the data for the current percentage
        console.log(`Data for ${percentage * 100}%:`, newData);
 // Set custom tooltip title dynamically
        myChart.options.plugins.tooltip.callbacks.title = function (tooltipItems) {
            const tooltipItem = tooltipItems[0]; // Assuming you have only one dataset in the chart

            if (tooltipItem) {
                const label = tooltipItem.label;
                const year = ' Year ' ; // Adjust for singular or plural
                return  year + label;
            }

            return ''; // Default title if tooltipItem is not available
        };
        equityGrowthChart.options.plugins.tooltip.callbacks.title = function (tooltipItems) {
            const tooltipItem = tooltipItems[0]; // Assuming you have only one dataset in the chart

            if (tooltipItem) {
                const label = tooltipItem.label;
                const year = ' Year ' ; // Adjust for singular or plural
                return  year + label;
            }

            return ''; // Default title if tooltipItem is not available
        };
        // Center the tooltip title
        myChart.options.plugins.tooltip.titleAlign = 'center';
        equityGrowthChart.options.plugins.tooltip.titleAlign = 'center';
        // Update the chart
        myChart.update();
        equityGrowthChart.update();

    }

    // Event handler for changes in 'weekly_rent Value'
    $('#interest_rate').on('input', function () {
        // Perform your calculation here (if needed)
        loanExpenses();
          annualRepaymentAmount();
        annualRepaymentAmountAsPurchased();
    });

     $('.amountInput, #management_fees_amount').on('input', function () {
        propertyManagementFees();
        RefinancedCalculation();
        annualRepaymentAmount();
        annualRepaymentAmountAsPurchased();
    });


    $('#internal_painting').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#external_painting').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#flooring').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#roof').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#fitting_fixtures').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#lighting').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#curtains_windows').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#landscaping').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#kitchen').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#bathroom').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    $('#fencing').on('input', function () {
        // Perform your calculation here (if needed)
        calculateRenovationCost();
    });
    
    $('#refinanced_interest_rate').on('input', function () {
        // Perform your calculation here (if needed)
        RefinancedCalculation();
        annualRepaymentAmount();
    });
    
    // Initial calculation when the page loads
    updateDiscount();
    totalCashRequired();
    loanEstablishedExpense();
    propertyManagementFees();
      propertyRenovationFees();
    loanExpenses();
    calculateRenovationCost();
    annualRepaymentAmount();
    annualRepaymentAmountAsPurchased();
    updateGraph(0.05);
    updateGraph(0.07);
    updateGraph(0.1);
    UpliftCalculation();
    RefinancedCalculation();

});

