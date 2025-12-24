# DataMaglia Website - GoDaddy Hosting Instructions

## Overview
This guide will help you deploy your DataMaglia fractional CTO services website to GoDaddy hosting. The website is built with modern HTML5, CSS3, and JavaScript, making it compatible with GoDaddy's hosting environment.

## Files Included
Your website package includes:
- `index.html` - Homepage
- `services.html` - Services page
- `about.html` - About/Team page
- `contact.html` - Contact page
- `styles.css` - Main stylesheet
- `script.js` - JavaScript functionality
- This instruction file

## Step 1: Access Your GoDaddy Hosting Control Panel

1. Log in to your GoDaddy account at [godaddy.com](https://www.godaddy.com)
2. Navigate to **Web Hosting** in your account dashboard
3. Find your datamaglia.com domain and click **Manage**
4. Look for **File Manager** or **cPanel** access

## Step 2: Access File Manager

### Option A: Through GoDaddy File Manager
1. In your hosting dashboard, click **File Manager**
2. Navigate to the **public_html** folder
3. This is where your website files will be uploaded

### Option B: Through cPanel (if available)
1. Click **cPanel** in your hosting dashboard
2. Find and click **File Manager**
3. Navigate to **public_html** directory

## Step 3: Remove Existing Template Files

1. In the `public_html` folder, you'll likely see template files
2. **IMPORTANT: Backup existing files first** by downloading them
3. Delete or move the template files (common names: `index.html`, `coming-soon.html`, etc.)
4. Clear the directory to make room for your new website

## Step 4: Upload Website Files

### Method 1: Using File Manager Upload
1. In File Manager, make sure you're in the `public_html` directory
2. Click **Upload** or **Upload Files**
3. Select all your website files:
   - index.html
   - services.html
   - about.html
   - contact.html
   - styles.css
   - script.js
4. Wait for upload to complete

### Method 2: Using FTP (Advanced)
If you prefer FTP, use these settings:
- **Host:** ftp.datamaglia.com
- **Username:** Your GoDaddy hosting username
- **Password:** Your GoDaddy hosting password
- **Port:** 21 (FTP) or 22 (SFTP)
- **Directory:** /public_html/

## Step 5: Set File Permissions

1. After uploading, select all HTML files
2. Right-click and choose **Change Permissions** or **File Permissions**
3. Set permissions to **644** for all files
4. For the `public_html` directory, ensure permissions are set to **755**

## Step 6: Test Your Website

1. Open a web browser
2. Navigate to `https://datamaglia.com`
3. Your new website should load with:
   - Professional homepage with hero section
   - Navigation working between pages
   - Contact form functional (basic validation)
   - Responsive design on mobile devices

## Step 7: Configure Email (contact@datamaglia.com)

### Create Email Account
1. In your GoDaddy hosting dashboard, find **Email** or **Email Accounts**
2. Click **Create Email Account**
3. Set up: `contact@datamaglia.com`
4. Choose a secure password
5. Set storage allocation (recommend at least 1GB)

### Email Forwarding (Optional)
If you want emails forwarded to your personal email:
1. Go to **Email Forwarding** in your hosting panel
2. Create a forward from `contact@datamaglia.com` to your personal email

## Step 8: SSL Certificate Setup

1. In your GoDaddy hosting dashboard, look for **SSL Certificates**
2. Most GoDaddy plans include a free SSL certificate
3. If not already activated, click **Activate SSL** or **Install SSL**
4. Choose the free SSL option
5. Wait for activation (can take up to 24 hours)
6. Once active, test `https://datamaglia.com` to ensure secure connection

## Step 9: Set Up Email Contact Form (Advanced)

The contact form currently uses JavaScript validation only. To make it fully functional:

### Option A: GoDaddy Form Mail (if available)
1. Check if your hosting plan includes form mail
2. Update the form action in `contact.html` to point to GoDaddy's form mail script

### Option B: PHP Form Handler (recommended)
Create a simple PHP script to handle form submissions:

1. Create a new file called `contact-handler.php` in File Manager
2. Add this basic PHP code:

```php
<?php
if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $company = $_POST['company'];

    $to = "contact@datamaglia.com";
    $subject = "New Contact Form Submission from DataMaglia.com";

    $body = "New contact form submission:\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Company: " . $company . "\n";
    $body .= "Message: " . $message . "\n";

    $headers = "From: " . $email;

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
```

3. Update the form in `contact.html`:
   - Change `<form class="contact-form" id="contact-form">`
   - To `<form class="contact-form" id="contact-form" action="contact-handler.php" method="POST">`

## Step 10: Configure Google Analytics (Optional)

1. Create a Google Analytics account at [analytics.google.com](https://analytics.google.com)
2. Get your tracking code
3. Add the tracking code before the `</head>` tag in all HTML files

Example:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Step 11: Set Up 301 Redirects (Optional)

Create a `.htaccess` file in your `public_html` directory for SEO-friendly redirects:

```apache
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force www or non-www (choose one)
RewriteCond %{HTTP_HOST} ^www\.datamaglia\.com [NC]
RewriteRule ^(.*)$ https://datamaglia.com/$1 [L,R=301]
```

## Troubleshooting Common Issues

### Website Not Loading
- Check that `index.html` is in the root of `public_html`
- Verify file permissions are set to 644
- Clear browser cache and try again

### Images or Styles Not Loading
- Check file paths in HTML are correct
- Ensure all files are uploaded to the same directory
- Verify file names match exactly (case-sensitive)

### Contact Form Not Working
- Ensure PHP is enabled on your hosting plan
- Check that the PHP script has proper permissions (644)
- Verify email settings are configured correctly

### SSL Certificate Issues
- SSL activation can take up to 24 hours
- Contact GoDaddy support if SSL doesn't activate
- Ensure all internal links use `https://`

## Performance Optimization

### Enable Gzip Compression
Add to your `.htaccess` file:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### Browser Caching
Add to your `.htaccess` file:
```apache
<IfModule mod_expires.c>
ExpiresActive on
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## Maintenance and Updates

### Regular Backups
- Use GoDaddy's backup service if available
- Download copies of your files regularly
- Keep a local copy of all website files

### Content Updates
- Edit HTML files directly in File Manager
- Or download, edit locally, and re-upload
- Test changes on a staging site if possible

### Security
- Keep your GoDaddy account password secure
- Monitor contact form for spam submissions
- Regularly update any plugins or scripts

## Support Resources

- **GoDaddy Support:** Available 24/7 via phone or chat
- **Help Center:** [godaddy.com/help](https://godaddy.com/help)
- **Video Tutorials:** Check GoDaddy's YouTube channel
- **Community Forum:** Connect with other GoDaddy users

## Website Features Summary

Your DataMaglia website includes:
- **Responsive Design:** Works on all devices
- **Modern Styling:** Professional gradients and animations
- **Contact Form:** With validation and modern UX
- **SEO Optimized:** Meta tags and structured data
- **Fast Loading:** Optimized CSS and JavaScript
- **Accessibility:** Screen reader friendly
- **Professional Content:** Based on your impressive experience

## Next Steps After Launch

1. **Test thoroughly** on different devices and browsers
2. **Submit to search engines** (Google Search Console, Bing)
3. **Set up social media profiles** and link them
4. **Monitor analytics** to track visitor behavior
5. **Collect feedback** and iterate on the design
6. **Consider adding a blog** for thought leadership content

## Contact Information

If you need help with the deployment or have questions about the website functionality, you can refer to the inline comments in the code files for guidance.

---

**Congratulations!** Your professional DataMaglia website is now ready to help you attract and convert potential clients for your fractional CTO services.