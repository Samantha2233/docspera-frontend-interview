$.ajax('https://dalazaro.github.io/ds-json-example/example.json', {
  dataType: 'json',
  success: function (data) {
    console.log('jQuery Data', data);
    $('#loading-signal').hide();
    var $cases = data.cases;
    var $casesDiv = $('#cases-div');
    $casesDiv.show();

    $.each($cases, function (i, c) {
      // Initial info displayed
      var $card = $('<div></div>');
      var $caseType = c.details.case_type;
      var $caseTitle = (c.details.case_title);
      var $dob = 'Date of Birth:';
      var $dobData = moment((c.patient.dob).toString()).format('MM/DD/YYYY');
      var $caseNotes = 'Case Notes:';
      var $caseNotesData = c.details.notes;

      // Place initial infor in respective divs
      var $initialDiv = $('<div class="initial-div"></div>')
      var $labelDiv = '<div class="label-div"><p>' + $caseType + '</p><p>' + $dob + '</p><p>' + $caseNotes + '</p></div>';
      var $infoDiv = '<div><p>' + $caseTitle + '</p><p>' + $dobData + '</p><p>' + $caseNotesData + '</p></div>';
      var $detailArrow = $('<i class="fas fa-angle-down detail_arrow"></i>');

      $initialDiv.append($labelDiv);
      $initialDiv.append($infoDiv);

      // When detail arrow is clicked... 
      // Expanded info displayed when card is expanded
      var $caseId = c.case_id;
      var $patientName = c.patient.name.last + ', ' + c.patient.name.first;
      var $gender = c.patient.gender;
      var $mrn = c.patient.mrn;
      var $startTime = moment(c.details.time.start).format('YYYY/MM/DD HH:mm:ss a');
      var $endTime = moment(c.details.time.end).format('YYYY/MM/DD HH:mm:ss a');
      var $physicianName = c.details.physician;

      console.log(c.details.time.start);
      console.log(moment(c.details.time.start).format('YYYY/MM/DD'));



      var $patientInfo = $('<div class="patient-div"><div class="label-div"><p> Case ID: </p><p> Patient Name: </p><p> Gender: </p><p> Medical Record #:</p></div><div class="info-div"><p>' + $caseId + '</p><p>' + $patientName + '</p><p>' + $gender + '</p><p> ' + $mrn + ' </p></div></div>');
      var $procedureInfo = $('<div class="procedure-div"><div class="label-div"><p> Start Time: </p><p> End Time: </p><p> Physician Name: </p></div><div class="info-div"><p>' + $startTime + '</p><p>' + $endTime + '</p><p>' + $physicianName + '</p></div></div>');



      var $expansiveDiv = $('<div class="expansive-div"></div>');
      var $expansiveSubDiv = $('<div class="expansive-sub-div"></div>');
      // Expansive Wrapper solves a glitch when display goes from none to flex.
      var $expansiveWrapper = $('<div class="expansive-wrapper"></div>');
      $expansiveDiv.append($detailArrow);
      $expansiveDiv.append($expansiveSubDiv);

      $expansiveWrapper.append($patientInfo);
      $expansiveWrapper.append($procedureInfo);


      $expansiveSubDiv.append($expansiveWrapper);


      $card.append($initialDiv);
      $card.append($expansiveDiv);
      $card.append($expansiveDiv);

      $casesDiv.append($card);

      if ($caseType === 'Surgery') {
        $card.attr('class', 'surgery-case');
      } else if ($caseType === 'Clinical') {
        $card.attr('class', 'clinical-case');
      }

      // When detail arrow is hovered...
      $detailArrow.hover(function () {
        if ($caseType === 'Surgery') {
          $(this).css('background-color', 'rgb(197, 230, 252)');
        } else if ($caseType === 'Clinical') {
          $(this).css('background-color', 'rgb(252, 233, 216)');
        }
      }, function () {
        $(this).css('background-color', 'transparent');
      });

      // When detail arrow is clicked...
      $detailArrow.click(function (e) {
        $(this).toggleClass('rotated-arrow');
        var $thisInfo = $(this).next();
        var $thisParent = $(this).parent();
        $thisInfo.slideToggle('slow', function () {
          if (!$(this).is(':visible')) $thisParent.css('background-color', 'transparent');
        });

        if ($caseType === 'Surgery') {
          $thisParent.css('background-color', 'rgb(197, 230, 252)');
        } else if ($caseType === 'Clinical') {
          $thisParent.css('background-color', 'rgb(252, 233, 216)');
        }

      })
    });
  },
  error: function (errorMessage) {
    $('p').append('Error: ' + errorMessage)
  }
});