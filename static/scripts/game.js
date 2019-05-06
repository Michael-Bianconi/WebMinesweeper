/**
 * Called when a tile is clicked. Sends the coordinates
 * to the /onTileClick route as a string tuple of "row,col"
 */
function onTileClick() {

    var position;

    $('button').click(function() {

        position = $(this).attr("name");
        console.log(position)
        $.ajax({

            url: "/onTileClick",
            type: "POST",
            data: JSON.stringify({"position": position}),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            error: function (error) {
                console.log(error)
            }
        });
    });
}