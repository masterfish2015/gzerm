gRegions = new Mongo.Collection("regions");
gRegions.attachSchema(new SimpleSchema({
    code:{
        type:String,
        label:"区域编码"
    },
    title:{
        type:String,
        label:"区域名称"
    },
    parentCode:{
        type:String,
        label:"上级区域编码"
    }
}));
