<?php
// Security headers
header("X-Frame-Options: DENY");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection: 1; mode=block");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Permissions-Policy: geolocation=(), microphone=(), camera=()");
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';");

$projects_data = file_get_contents('projects.json');
$projects = json_decode($projects_data, true)['projects'];

// Sanitize projects data
foreach ($projects as &$project) {
    $project['name'] = htmlspecialchars($project['name'], ENT_QUOTES, 'UTF-8');
    $project['type'] = htmlspecialchars($project['type'], ENT_QUOTES, 'UTF-8');
    $project['description'] = htmlspecialchars($project['description'], ENT_QUOTES, 'UTF-8');
    $project['status'] = htmlspecialchars($project['status'], ENT_QUOTES, 'UTF-8');
    foreach ($project['tech'] as &$tech) {
        $tech = htmlspecialchars($tech, ENT_QUOTES, 'UTF-8');
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>bransoncr@localhost:~$</title>
    <meta name="description" content="Branson Crawford - Computer Science major focused on systems programming and networking">

    <!-- Security meta tags for static deployment -->
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';">

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <pre class="ascii-art">
╔═══════════════════════════════════════════════════════════════════════════╗
║  0x42 0x52 0x41 0x4E 0x53 0x4F 0x4E     [BRANSON.SYS v2.0]               ║
║  ┌────────────────────────────────────────────────────────────────────┐  ║
║  │ PROCESS: portfolio.exe          PID: 1337      PORT: 8080          │  ║
║  │ STATUS: RUNNING                 MEM: 0x7FF8A000-0x7FF8FFFF         │  ║
║  └────────────────────────────────────────────────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════════════════╝
            </pre>
        </div>

        <div class="terminal">
            <div class="terminal-output" id="output">
                <div class="boot-sequence">
                    <span class="timestamp">[0.000000]</span> Initializing kernel modules...<br>
                    <span class="timestamp">[0.012847]</span> Loading network stack... OK<br>
                    <span class="timestamp">[0.024531]</span> Mounting /home/bransoncr... OK<br>
                    <span class="timestamp">[0.038942]</span> Starting portfolio service on port 8080...<br>
                    <span class="timestamp">[0.045123]</span> System ready.<br>
                    <br>
                </div>

                <div class="welcome">
                    <span class="green">bransoncr@localhost</span>:<span class="blue">~</span>$ cat README.txt<br>
                    <div class="info-box">
┌─────────────────────────────────────────────────────────────┐
<br>│ BRANSON CRAWFORD     <t><t>                                       
<br>│ Computer Science Major & Mathematics Minor                  
<br>│ University of British Columbia Okanagan                     
<br>├─────────────────────────────────────────────────────────────┤
<br>│ INTERESTS: Systems Programming │ Networking │ Database      
<br>│ FOCUS: Low-level code, OS development, network protocols    
<br>├─────────────────────────────────────────────────────────────┤
<br>│ CONTACT:                                                    
<br>│   ├─ EMAIL:    bransonancrawford@gmail.com                 
<br>│   ├─ GITHUB:   github.com/BransonCr                        
<br>│   └─ LINKEDIN: linkedin.com/in/branson-crawford-43651b333  <br>│
<br>└─────────────────────────────────────────────────────────────┘
                    </div>
                    <br>
                    <span class="green">bransoncr@localhost</span>:<span class="blue">~</span>$ ls -la<br>
                    <div class="file-list">
drwxr-xr-x  5 bransoncr users  4096 Dec  4 2024 .<br>
drwxr-xr-x 24 root      root   4096 Dec  1 2024 ..<br>
-rw-r--r--  1 bransoncr users   220 Dec  1 2024 README.txt<br>
drwxr-xr-x  2 bransoncr users  4096 Dec  4 2024 <span class="dir-link" data-dir="projects">projects/</span><br>
drwxr-xr-x  2 bransoncr users  4096 Dec  4 2024 <span class="dir-link" data-dir="skills">skills/</span><br>
drwxr-xr-x  2 bransoncr users  4096 Dec  4 2024 <span class="dir-link" data-dir="contact">contact/</span><br>
                    </div>
                    <br>
                    <span class="comment">Type <span class="command">help</span> for available commands</span><br>
                    <br>
                </div>
            </div>

            <div class="terminal-input">
                <span class="prompt">
                    <span class="green">bransoncr@localhost</span>:<span class="blue">~</span>$
                </span>
                <input type="text" id="command-input" autocomplete="off" spellcheck="false" autofocus>
            </div>
        </div>

        <div class="footer">
            <span class="footer-item">NET: 192.168.1.100:8080</span>
            <span class="footer-item">│</span>
            <span class="footer-item">TX: 2.4KB/s</span>
            <span class="footer-item">│</span>
            <span class="footer-item">RX: 1.8KB/s</span>
            <span class="footer-item">│</span>
            <span class="footer-item">UPTIME: <?php echo floor(time() / 86400); ?> days</span>
            <span class="footer-item">│</span>
            <span class="footer-item">MEM: 0x<?php echo dechex(memory_get_usage()); ?></span>
        </div>
    </div>

    <script>
        const projects = <?php echo json_encode($projects); ?>;
    </script>
    <script src="script.js"></script>
</body>
</html>
