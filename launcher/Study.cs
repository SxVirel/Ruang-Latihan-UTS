// Opens app\index.html in an app-style Edge window (no tabs or address bar).
// Falls back to Chrome, then to the default browser.
using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

[assembly: System.Reflection.AssemblyTitle("Latihan UTS")]
[assembly: System.Reflection.AssemblyProduct("Latihan UTS")]

static class Study
{
    [STAThread]
    static void Main()
    {
        string dir = AppDomain.CurrentDomain.BaseDirectory;
        string index = Path.Combine(dir, "app", "index.html");
        if (!File.Exists(index))
        {
            MessageBox.Show("File app\\index.html tidak ditemukan.\nPastikan Study.exe berada di folder Study bersama folder app.",
                "Latihan UTS", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return;
        }

        string url = new Uri(index).AbsoluteUri;
        string browser = Find(
            @"Microsoft\Edge\Application\msedge.exe",
            @"Google\Chrome\Application\chrome.exe");

        try
        {
            if (browser != null)
                Process.Start(browser, "--app=\"" + url + "\" --window-size=1280,860");
            else
                Process.Start(new ProcessStartInfo(index) { UseShellExecute = true });
        }
        catch (Exception e)
        {
            MessageBox.Show("Gagal membuka browser: " + e.Message, "Latihan UTS", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    static string Find(params string[] relative)
    {
        string[] roots = {
            Environment.GetEnvironmentVariable("ProgramFiles(x86)"),
            Environment.GetEnvironmentVariable("ProgramFiles"),
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
        };
        foreach (string rel in relative)
            foreach (string root in roots)
            {
                if (string.IsNullOrEmpty(root)) continue;
                string path = Path.Combine(root, rel);
                if (File.Exists(path)) return path;
            }
        return null;
    }
}
