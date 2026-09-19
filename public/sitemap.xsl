<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Dr. Gaurav Bhargava - Joint Clinic Kanpur</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, follow" />
        <style type="text/css">
          <![CDATA[
          :root {
            --primary: #059B8F;
            --primary-dark: #0A7C97;
            --accent: #F18712;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --bg-page: #f8fafc;
            --bg-card: #ffffff;
            --border: #e2e8f0;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            background-color: var(--bg-page);
            color: var(--text-main);
            line-height: 1.5;
            padding: 24px 16px;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Header Hero */
          .header-card {
            background: linear-gradient(135deg, #044b55 0%, #059B8F 50%, #0A7C97 100%);
            border-radius: 16px;
            padding: 32px 36px;
            color: #ffffff;
            box-shadow: 0 10px 25px -5px rgba(5, 155, 143, 0.25);
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
          }

          .header-card::after {
            content: "";
            position: absolute;
            top: -60px;
            right: -60px;
            width: 220px;
            height: 220px;
            background: radial-gradient(circle, rgba(241, 135, 18, 0.3) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            pointer-events: none;
          }

          .clinic-brand {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 14px;
            border: 1px solid rgba(255, 255, 255, 0.25);
          }

          .title {
            font-size: 30px;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin-bottom: 10px;
            line-height: 1.2;
          }

          .subtitle {
            font-size: 15px;
            color: rgba(255, 255, 255, 0.9);
            max-width: 780px;
            line-height: 1.6;
            margin-bottom: 22px;
          }

          .nav-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
          }

          .btn-home {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background-color: #ffffff;
            color: #044b55;
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .btn-home:hover {
            background-color: #f1f5f9;
            transform: translateY(-1px);
          }

          .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.12);
            color: #ffffff;
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
          }

          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.22);
          }

          /* Info Bar */
          .stats-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }

          .stat-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 18px 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .stat-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }

          .stat-value {
            font-size: 22px;
            font-weight: 800;
            color: var(--text-main);
          }

          .stat-value.highlight {
            color: var(--primary);
          }

          /* Interactive Filter */
          .filter-bar {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
          }

          .search-wrapper {
            position: relative;
            flex: 1;
            min-width: 260px;
          }

          .search-input {
            width: 100%;
            padding: 10px 16px 10px 38px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
            background: #ffffff;
          }

          .search-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(5, 155, 143, 0.15);
          }

          .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
            pointer-events: none;
          }

          .filter-count {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
          }

          /* Table */
          .table-container {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
          }

          thead {
            background: #f1f5f9;
            border-bottom: 2px solid var(--border);
          }

          th {
            padding: 14px 18px;
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #475569;
          }

          th.col-idx { width: 50px; text-align: center; }
          th.col-url { min-width: 380px; }
          th.col-prio { width: 120px; text-align: center; }
          th.col-freq { width: 120px; text-align: center; }
          th.col-date { width: 180px; text-align: right; }

          tbody tr {
            border-bottom: 1px solid var(--border);
            transition: background-color 0.15s ease;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          tbody tr:nth-child(even) {
            background-color: #fafbfd;
          }

          tbody tr:hover {
            background-color: #f0fdf9;
          }

          td {
            padding: 12px 18px;
            vertical-align: middle;
          }

          td.col-idx {
            text-align: center;
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 600;
          }

          td.col-url a {
            color: #0369a1;
            font-weight: 600;
            text-decoration: none;
            word-break: break-all;
            display: inline-block;
            transition: color 0.15s ease;
          }

          td.col-url a:hover {
            color: var(--primary);
            text-decoration: underline;
          }

          td.col-prio {
            text-align: center;
          }

          td.col-freq {
            text-align: center;
          }

          td.col-date {
            text-align: right;
            font-size: 13px;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
          }

          /* Badges */
          .badge {
            display: inline-block;
            padding: 4px 9px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.3px;
            text-transform: uppercase;
          }

          .badge-prio-10 {
            background-color: #ccfbf1;
            color: #0f766e;
            border: 1px solid #99f6e4;
          }

          .badge-prio-9 {
            background-color: #e0f2fe;
            color: #0369a1;
            border: 1px solid #bae6fd;
          }

          .badge-prio-85 {
            background-color: #e0e7ff;
            color: #4338ca;
            border: 1px solid #c7d2fe;
          }

          .badge-prio-8 {
            background-color: #f1f5f9;
            color: #334155;
            border: 1px solid #cbd5e1;
          }

          .badge-prio-def {
            background-color: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
          }

          .badge-freq-daily {
            background-color: #fef3c7;
            color: #b45309;
            border: 1px solid #fde68a;
          }

          .badge-freq-weekly {
            background-color: #f0fdf4;
            color: #15803d;
            border: 1px solid #bbf7d0;
          }

          .badge-freq-other {
            background-color: #f1f5f9;
            color: #64748b;
            border: 1px solid #e2e8f0;
          }

          /* Footer */
          .footer-note {
            margin-top: 24px;
            padding: 16px 20px;
            text-align: center;
            font-size: 13px;
            color: var(--text-muted);
            border-top: 1px solid var(--border);
          }

          .footer-note strong {
            color: var(--text-main);
          }

          @media (max-width: 768px) {
            body { padding: 12px 8px; }
            .header-card { padding: 24px 20px; }
            .title { font-size: 22px; }
            th.col-freq, td.col-freq, th.col-date, td.col-date { display: none; }
          }
          ]]>
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Hero Card -->
          <div class="header-card">
            <div class="clinic-brand">
              <span>🏥 Joint Clinic &amp; Orthopedic Centre</span>
            </div>
            <h1 class="title">XML Sitemap</h1>
            <p class="subtitle">
              Official indexed sitemap for search engines (Google, Bing, Yahoo) and AI search engines (Perplexity, ChatGPT Search, Claude, Gemini). It outlines all verified URLs, consultation categories, procedure guides, and rehabilitation protocols by Dr. Gaurav Bhargava in Kanpur.
            </p>
            <div class="nav-actions">
              <a href="https://jointclinic.in/" class="btn-home">← Return to Website</a>
              <a href="https://jointclinic.in/appointment" class="btn-secondary">Book Consultation</a>
              <a href="https://jointclinic.in/llms.txt" class="btn-secondary">AI Discovery (llms.txt)</a>
            </div>
          </div>

          <!-- Quick Stats Bar -->
          <div class="stats-bar">
            <div class="stat-card">
              <div class="stat-label">Total Indexed Pages</div>
              <div class="stat-value highlight">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Verified Medical Authority</div>
              <div class="stat-value">Dr. Gaurav Bhargava</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Location / Reach</div>
              <div class="stat-value">Kanpur, UP</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Sitemap Protocol</div>
              <div class="stat-value">0.9 Standard</div>
            </div>
          </div>

          <!-- Interactive Search Filter -->
          <div class="filter-bar">
            <div class="search-wrapper">
              <span class="search-icon">🔍</span>
              <input type="text" id="urlSearch" class="search-input" placeholder="Quick filter URLs by keyword (e.g. knee, hip, recovery, fracture)..." onkeyup="filterSitemap()" />
            </div>
            <div class="filter-count" id="filterCount">
              Showing all <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> pages
            </div>
          </div>

          <!-- Sitemap Table -->
          <div class="table-container">
            <table id="sitemapTable">
              <thead>
                <tr>
                  <th class="col-idx">#</th>
                  <th class="col-url">Page URL</th>
                  <th class="col-prio">Priority</th>
                  <th class="col-freq">Change Freq</th>
                  <th class="col-date">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="col-idx">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td class="col-url">
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="col-prio">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority = '1' or sitemap:priority = '1.0'">
                          <span class="badge badge-prio-10">1.0</span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority = '0.9'">
                          <span class="badge badge-prio-9">0.9</span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority = '0.85'">
                          <span class="badge badge-prio-85">0.85</span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority = '0.8'">
                          <span class="badge badge-prio-8">0.8</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-prio-def"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="col-freq">
                      <xsl:choose>
                        <xsl:when test="sitemap:changefreq = 'daily'">
                          <span class="badge badge-freq-daily">daily</span>
                        </xsl:when>
                        <xsl:when test="sitemap:changefreq = 'weekly'">
                          <span class="badge badge-freq-weekly">weekly</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-freq-other"><xsl:value-of select="sitemap:changefreq"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="col-date">
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="footer-note">
            <p>
              <strong>Joint Clinic &amp; Orthopedic Centre</strong> • Dr. Gaurav Bhargava (MBBS, MS Orthopedics) • 120/500 (10), Lajpat Nagar, Narainpurwa, Kanpur, UP 208005
            </p>
            <p style="margin-top: 6px; font-size: 12px; color: #94a3b8;">
              This styled view is generated by XSLT for human convenience. Web search spiders and AI engines parse the raw XML tree directly.
            </p>
          </div>
        </div>

        <script type="text/javascript">
          <![CDATA[
          function filterSitemap() {
            var input = document.getElementById("urlSearch");
            var filter = input.value.toLowerCase();
            var table = document.getElementById("sitemapTable");
            var tr = table.getElementsByTagName("tr");
            var visibleCount = 0;
            var totalCount = tr.length - 1; // subtract header row

            for (var i = 1; i < tr.length; i++) {
              var td = tr[i].getElementsByTagName("td")[1];
              if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                  visibleCount++;
                } else {
                  tr[i].style.display = "none";
                }
              }
            }

            var countDisplay = document.getElementById("filterCount");
            if (countDisplay) {
              if (filter.length > 0) {
                countDisplay.innerText = "Showing " + visibleCount + " of " + totalCount + " pages";
              } else {
                countDisplay.innerText = "Showing all " + totalCount + " pages";
              }
            }
          }
          ]]>
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
