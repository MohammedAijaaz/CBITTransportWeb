window.onload = function() {
    console.log("starting...");
    var myList = $('#myList');
    var database = firebase.database().ref();
    database.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var v = childSnapshot.val();
            myList.prepend(
                '<button class="btn btn-default" onclick="setMarker(' + v.busNumber + ')" style="width : 100%; margin : 0px">' + v.busNumber + '</button><br>'
            );
        });
    });
    console.log("done");
}

function setMarker(v) {
    var ref = firebase.database().ref(v);
    ref.on('value', function(snapshot) {
        var obj = snapshot.val();
        console.log(obj);
        if (obj === null) {
            window.alert("Bus went offline!");
            location.reload();
        } else {
            var newBus = {
                lat: obj.lattitude,
                lng: obj.longitude
            };
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 19,
                center: newBus
            });
            var marker = new google.maps.Marker({
                position: newBus,
                map: map
            });
        }
    });


    console.log("donedonedone");
}