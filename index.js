// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create employee records from an array of arrays
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((array) => createEmployeeRecord(array));
  }
  
  // Create a timeIn event
  function createTimeInEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour, 10), // Convert to integer
      date,
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  // Create a timeOut event
  function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10), // Convert to integer
      date,
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  // Calculate the hours worked on a given date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    }
  
    // Convert the hours to integers
    const timeInHour = parseInt(timeInEvent.hour, 10);
    const timeOutHour = parseInt(timeOutEvent.hour, 10);
  
    // Calculate the hours worked
    const hoursWorked = timeOutHour - timeInHour;
  
    return hoursWorked;
  }
  
  // Calculate the wages earned on a given date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
  }
  
  // Calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    const wagesEarned = employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return wagesEarned;
  }
  
  // Calculate the payroll for an array of employees
  function calculatePayroll(employeeRecords) {
    const totalWagesEarned = employeeRecords.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
  
    return totalWagesEarned;
  }
  
  // Mock data from Ultron data systems
  const mockData = [
    ["Loki", "Odinson", "God of Mischief", 100],
    ["Natalia", "Romanova", "Black Widow", 75],
  ];
  
  // Create employee records from the mock data
  const employeeRecords = createEmployeeRecords(mockData);
  
  // Add timeIn and timeOut events for employees (example usage)
  createTimeInEvent(employeeRecords[0], "2023-10-06 08:00");
  createTimeOutEvent(employeeRecords[0], "2023-10-06 16:00");
  createTimeInEvent(employeeRecords[1], "2023-10-06 09:00");
  createTimeOutEvent(employeeRecords[1], "2023-10-06 17:00");
  
  // Calculate the payroll
  const totalPayroll = calculatePayroll(employeeRecords);
  
  console.log(`Total payroll: $${totalPayroll}`);
