# 🔄 Open WebUI Upgrade Preservation Guide

## 🎯 Critical Customizations to Preserve

### 1. 📄 **PDF Download for Artifacts** (PRIORITY 1)
**Location**: `src/lib/components/chat/Artifacts.svelte`

#### Key Dependencies:
```json
{
  "jspdf": "^2.5.1",
  "html2canvas-pro": "^1.5.8"
}
```

#### Critical Code Sections:
- **Lines 15-16**: Import statements for PDF libraries
- **Lines 198-264**: `downloadArtifactAsPDF()` function
- **Lines 360-380**: PDF download button in the UI

#### What the PDF feature does:
- Converts HTML/CSS/JS artifacts to high-quality PDFs
- A4 format with proper scaling
- Multi-page support for long content
- Error handling with toast notifications

### 2. 🎨 **Branding Customizations**
- Custom logos in `static/` directory
- Automated branding script: `scripts/customize-branding.js`
- Modified components for brand removal

---

## 🚨 BEFORE ANY UPGRADE

### Step 1: Backup Your Critical Files
```bash
# Create backup directory
mkdir upgrade-backup-$(date +%Y%m%d)

# Backup critical customized files
cp src/lib/components/chat/Artifacts.svelte upgrade-backup-$(date +%Y%m%d)/
cp scripts/customize-branding.js upgrade-backup-$(date +%Y%m%d)/
cp CUSTOMIZATION_GUIDE.md upgrade-backup-$(date +%Y%m%d)/
cp -r static/ upgrade-backup-$(date +%Y%m%d)/static/

# Backup package.json for dependencies
cp package.json upgrade-backup-$(date +%Y%m%d)/
```

### Step 2: Document Current Dependencies
```bash
# Save current package versions
npm list --depth=0 > upgrade-backup-$(date +%Y%m%d)/current-packages.txt
```

---

## 🔄 UPGRADE METHODS

### Option A: Safe Branch Upgrade (RECOMMENDED)
```bash
# Create backup branch with your customizations
git checkout -b backup-customizations-$(date +%Y%m%d)
git add .
git commit -m "Backup all customizations before upgrade"

# Return to main and upgrade
git checkout main
git pull origin main

# Cherry-pick your customizations back
git cherry-pick backup-customizations-$(date +%Y%m%d)
```

### Option B: Stash and Reapply
```bash
# Stash all changes
git stash push -m "PDF artifacts and branding customizations"

# Pull latest version
git pull origin main

# Reapply your changes
git stash pop
```

### Option C: Fresh Install + Manual Restoration
If conflicts are too complex, start fresh and manually restore:

1. **Clone fresh Open WebUI**
2. **Install dependencies**
3. **Restore your customizations using this guide**

---

## 🔧 MANUAL RESTORATION STEPS

### 1. Restore PDF Artifacts Functionality

#### Add Dependencies:
```bash
npm install jspdf html2canvas-pro
```

#### Modify `src/lib/components/chat/Artifacts.svelte`:

Add these imports after line 14:
```javascript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
```

Add the PDF download function (around line 198):
```javascript
const downloadArtifactAsPDF = async () => {
	try {
		toast.success($i18n.t('Generating PDF...'));
		
		// Create a temporary div to render the content
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = contents[selectedContentIdx].content;
		tempDiv.style.position = 'absolute';
		tempDiv.style.left = '-9999px';
		tempDiv.style.width = '794px'; // A4 width in pixels at 96 DPI
		tempDiv.style.backgroundColor = 'white';
		tempDiv.style.padding = '20px';
		
		// Extract only the body content to avoid HTML/head tags
		const bodyMatch = contents[selectedContentIdx].content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
		if (bodyMatch) {
			tempDiv.innerHTML = bodyMatch[1];
		}
		
		document.body.appendChild(tempDiv);
		
		// Create canvas from the content
		const canvas = await html2canvas(tempDiv, {
			scale: 2,
			useCORS: true,
			allowTaint: true,
			backgroundColor: '#ffffff'
		});
		
		// Remove the temporary div
		document.body.removeChild(tempDiv);
		
		// Create PDF
		const pdf = new jsPDF({
			orientation: 'portrait',
			unit: 'px',
			format: [794, 1123] // A4 size in pixels
		});
		
		const imgData = canvas.toDataURL('image/png');
		const imgWidth = 794;
		const imgHeight = (canvas.height * imgWidth) / canvas.width;
		
		let heightLeft = imgHeight;
		let position = 0;
		
		// Add first page
		pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
		heightLeft -= 1123;
		
		// Add additional pages if content is longer than one page
		while (heightLeft >= 0) {
			position = heightLeft - imgHeight;
			pdf.addPage();
			pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
			heightLeft -= 1123;
		}
		
		// Download the PDF
		pdf.save(`artifact-${$chatId}-${selectedContentIdx}.pdf`);
		
		toast.success($i18n.t('PDF downloaded successfully!'));
	} catch (error) {
		console.error('Error generating PDF:', error);
		toast.error($i18n.t('Failed to generate PDF. Please try again.'));
	}
};
```

Add PDF download button in the UI (find the HTML download button and add after it):
```html
<Tooltip content={$i18n.t('Download PDF')}>
	<button
		class=" bg-none border-none text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-md p-0.5"
		on:click={downloadArtifactAsPDF}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="size-3.5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
			/>
		</svg>
	</button>
</Tooltip>
```

### 2. Restore Branding Customizations

1. **Copy logos back**: Restore files from `upgrade-backup-*/static/`
2. **Run branding script**: `node scripts/customize-branding.js`
3. **Verify all text replacements**

### 3. Test Everything

```bash
# Kill any running processes
taskkill /f /im node.exe
taskkill /f /im python.exe

# Install dependencies
pnpm install

# Start development
pnpm run dev
```

Test the PDF download:
1. Create a chat with HTML/CSS content
2. Open artifacts panel
3. Verify PDF download button works

---

## 🚨 CRITICAL SUCCESS CHECKLIST

### ✅ PDF Artifacts Working:
- [ ] jsPDF and html2canvas-pro dependencies installed
- [ ] PDF download button appears in artifacts panel
- [ ] PDF generation works without errors
- [ ] Multi-page content renders correctly

### ✅ Branding Preserved:
- [ ] Custom logos display correctly
- [ ] "Open WebUI" text replaced with your branding
- [ ] About page shows your information
- [ ] No broken images or references

### ✅ No Regressions:
- [ ] All original functionality still works
- [ ] Chat functionality unaffected
- [ ] Models and tools working
- [ ] No console errors

---

## 📞 Emergency Recovery

If something breaks during upgrade:

### Quick Fix:
```bash
# Restore from backup branch
git checkout backup-customizations-$(date +%Y%m%d)
```

### Clean Start:
```bash
# Reset to working state
git reset --hard backup-customizations-$(date +%Y%m%d)
```

---

## 🎯 FINAL NOTES

**MOST IMPORTANT**: Your PDF artifacts functionality is the critical piece. Everything else (branding) can be redone, but the PDF feature required significant custom development.

**Keep this guide updated** as you make more customizations. The PDF functionality in `Artifacts.svelte` is your crown jewel - protect it at all costs!

**For production deployments**: Always test the upgrade in a development environment first. 