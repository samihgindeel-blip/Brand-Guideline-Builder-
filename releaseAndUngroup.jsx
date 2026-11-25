#target illustrator

function main() {

    if (app.documents.length === 0) {
        alert("No document open.");
        return;
    }

    var win = new Window("dialog", "Release And Ungroup v1.1");

    win.orientation = "column";
    win.alignChildren = "fill";

    // Header
    var header = win.add("statictext", undefined, "Make sure to select artboard");
    header.alignment = "center";
    header.graphics.font = ScriptUI.newFont("Arial", "BOLD", 16);

    win.add("panel"); // separator line

    // Run Button
    var runBtn = win.add("button", undefined, "Hit Me With a Click");

    runBtn.onClick = function () {

        var doc = app.activeDocument;

       if (doc.selection.length === 0) { 
    alert("Are Kidding Me?\n\nI told you to select Artboard.");
    return;
   }

        // Release clipping mask 4 times
        for (var i = 0; i < 4; i++) {
            try {
                app.executeMenuCommand('releaseMask');
            } catch (e) {}
        }

        // Ungroup
        try {
            app.executeMenuCommand('ungroup');
        } catch (e) {}

        alert("✔امورك في التمام ");
    };

    win.add("panel"); // separator line

    // Footer
    var footer = win.add("statictext", undefined, "Designed by Samih Abdallah");
    footer.alignment = "center";
    footer = win.add("statictext", undefined, "Follow Me on Tiktok❤︎⁠");
    footer.alignment = "center"
    win.center();
    win.show();
}

main();
