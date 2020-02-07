// Retrieve issues from local storage
function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues"));
  var issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=
      '<div class="well">' +
      "<h6>Issue ID: " +
      id +
      "</h6>" +
      '<p><span class="label label-info">' +
      status +
      "</span></p>" +
      "<h3>" +
      desc +
      "</h3>" +
      '<p><span class="glyphicon glyphicon-time"></span> ' +
      severity +
      " " +
      '<span class="glyphicon glyphicon-user"></span> ' +
      assignedTo +
      "</p>" +
      '<a href="#" class="btn btn-info" onclick="setStatusStandBy(\'' +
      id +
      "')\">Stand By</a> " +
      '<a href="#" class="btn btn-success" onclick="setStatusInProgress(\'' +
      id +
      "')\">In Progress</a> " +
      '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' +
      id +
      "')\">Close</a> " +
      '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' +
      id +
      "')\">Delete</a>" +
      "</div>";
  }
}

// Saving issues to local storage

//// Attaching handler to the submit form
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  var issueId = chance.guid();
  var issueDesc = document.getElementById("issueDescInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueStatus = "Open";

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  };

  if (localStorage.getItem("issues") === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem("issue", JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();

  fetchIssues();

  e.preventDefault();
}

//// Working issues
function setStatusStandBy(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Stand By";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

//// Working issues
function setStatusInProgress(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "In Progress";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

//// Closing issues
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

//// Deleting issues
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}
