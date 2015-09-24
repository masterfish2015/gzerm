//本数据库表格是记录人事任命
gPersonAppointments=new Mongo.Collection("person appointments");

//人事任命的主要字段
//1.comanyID
//2.departmentID:
//3.personID:员工ID
//4.jobID:工作岗位ID
//5.startTime：开始时间
//6.endTime：结束时间
//7.appointer：任命人ID
//8.Dismissaler：免职人ID