#target illustrator

if (app.documents.length === 0) {
    alert("Open a document first.");
} else {

    var doc = app.activeDocument;

    // ================= UI =================
    var win = new Window("dialog", "Certificate Batch Generator");

    win.orientation = "column";
    win.alignChildren = "fill";

    var header = win.add("statictext", undefined, "Certificate Batch Generator Tool");
    header.graphics.font = ScriptUI.newFont("Arial", "BOLD", 14);

    win.add("statictext", undefined, "Enter names separated by commas:");

    var input = win.add("edittext", undefined, "Samih Abdallah, the script Guy");
    input.characters = 50;
    input.active = true;

    win.add("statictext", undefined, "Placeholder required in design: <<NAME>>");

    var generateBtn = win.add("button", undefined, "Generate");

    var footer = win.add("statictext", undefined,
        "Designed by Samih Abdallah\nSupport me by buying me a coffee\nPayPal: sami7graphic@gmail.com"
    );
    footer.justify = "center";

    // ================= LOGIC =================

    generateBtn.onClick = function () {

        if (input.text === "") {
            alert("Please enter names.");
            return;
        }

        var names = input.text.split(",");

        var templateArtboard = doc.artboards[0];
        var abRect = templateArtboard.artboardRect;
        var abWidth = abRect[2] - abRect[0];

        // Collect only items inside first artboard
        var templateItems = [];

        for (var i = 0; i < doc.pageItems.length; i++) {
            var item = doc.pageItems[i];
            if (isInsideArtboard(item, abRect)) {
                templateItems.push(item);
            }
        }

        if (templateItems.length === 0) {
            alert("No artwork found on first artboard.");
            return;
        }

        for (var n = 0; n < names.length; n++) {

            var cleanName = names[n].replace(/^\s+|\s+$/g, "");

            if (n > 0) {
                doc.artboards.add([
                    abRect[0] + (abWidth * n),
                    abRect[1],
                    abRect[2] + (abWidth * n),
                    abRect[3]
                ]);
            }

            for (var j = 0; j < templateItems.length; j++) {

                var dup = templateItems[j].duplicate();
                dup.left += abWidth * n;

                if (dup.typename === "TextFrame") {
                    if (dup.contents === "<<NAME>>") {
                        dup.contents = cleanName;
                    }
                }
            }
        }

        alert("Certificates generated successfully!\n\n" +
      "Support me by buying me a coffee ☕\n" +
      "PayPal: sami7graphic@gmail.com");

    };

    // Helper function
    function isInsideArtboard(item, abRect) {
        var bounds = item.visibleBounds;
        return (
            bounds[0] >= abRect[0] &&
            bounds[2] <= abRect[2] &&
            bounds[1] <= abRect[1] &&
            bounds[3] >= abRect[3]
        );
    }

    win.show();
}
