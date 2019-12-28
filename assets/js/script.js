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
      var $dob = moment((c.patient.dob).toString()).format('MM/DD/YYYY');
      var $caseNotes = c.details.notes;

      var $initialDiv = $('<div class="initial-div"></div>')
      var $initialTable = $('<table><tr><td><span class="label">' + $caseType + ': </span>' + $caseTitle + '</td></tr><tr><td><span class="label">Date of Birth: </span>' + $dob + '</td></tr><tr><td><span class="label">Case Notes: </span>' + $caseNotes + '</td></tr></table>')
      $initialDiv.append($initialTable);

      // Detail arrow & More Info...
      var $detailArrow = $('<i class="fas fa-angle-down detail_arrow"></i>');
      var $caseId = c.case_id;
      var $patientName = c.patient.name.last + ', ' + c.patient.name.first;
      var $gender = c.patient.gender;
      var $mrn = c.patient.mrn;
      var $start = moment(c.details.time.start).format('YYYY/MM/DD HH:mm:ss a');
      var $end = moment(c.details.time.end).format('YYYY/MM/DD HH:mm:ss a');
      var $physicianName = c.details.physician;

      var $patientTable = $('<table><tr><td><span class="label"> Case ID: </span>' + $caseId + '</td></tr><tr><td><span class="label"> Patient Name: </span>' + $patientName + '</td></tr><tr><td><span class="label"> Gender: </span>' + $gender + '</td></tr><tr><td><span class="label"> Medical Record #: </span>' + $mrn + '</td></tr></table>');
      var $procedureTable = $('<table><tr><td><span class="label"> Start: </span>' + $start + '</td></tr><tr><td><span class="label"> End: </span>' + $end + '</td></tr><tr><td><span class="label"> Physician Name: </span>' + $physicianName + '</td></tr></table>');

      var $expansiveDiv = $('<div class="expansive-div"></div>');
      var $expansiveSubDiv = $('<div class="expansive-sub-div"></div>');
      var $expansiveWrapper = $('<div class="expansive-wrapper"></div>');

      $expansiveDiv.append($detailArrow);
      $expansiveDiv.append($expansiveSubDiv);
      $expansiveWrapper.append($patientTable);
      $expansiveWrapper.append($procedureTable);
      $expansiveSubDiv.append($expansiveWrapper);
      $card.append($initialDiv);
      $card.append($expansiveDiv);
      $casesDiv.append($card);

      // Color case types
      if ($caseType === 'Surgery') {
        $card.attr('class', 'surgery-case');
      } else if ($caseType === 'Clinical') {
        $card.attr('class', 'clinical-case');
      }

      // Events
      $detailArrow.hover(function () {
        if ($caseType === 'Surgery') {
          $(this).css('background-color', 'rgb(197, 230, 252)');
        } else if ($caseType === 'Clinical') {
          $(this).css('background-color', 'rgb(252, 233, 216)');
        }
      }, function () {
        $(this).css('background-color', 'transparent');
      });

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