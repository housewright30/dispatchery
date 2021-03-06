Meteor.subscribe("statuses");

Template.statuses.onCreated(function() {
//  Session.set("curTech", Template.parentData(0) );
});

Template.statuses.helpers({
  statuses : function() {
//    var tech = Session.get("curTech");
    var tech = Template.parentData(0);
    //console.log(tech);
    return Statuses.find({status: {$not: tech.status}});
  },

  statusColor: function() {
    console.log(this.level);
    if (this.level == "available") {
      return "success";
    } else if (this.level === "away") {
      return "warning";
    } else {
      return "danger";
    }
  }
});

Template.statuses.events({
  'click .status-change': function(e) {
    var newStatus = $(e.currentTarget).text();
    var tech = Template.parentData(0);

    Techs.update(tech._id, {$set: {"status": newStatus} });
  }
});
