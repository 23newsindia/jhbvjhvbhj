/**
 * Wild Dragon SEO - Admin Dashboard JavaScript
 * Pure Vanilla JavaScript - Lightning Fast Performance
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize all functionality
    initDashboardEnhancements();
    initFormValidation();
    initTooltips();
    initAnimations();
    initTabPersistence();
    initQuickActions();

    /**
     * Initialize dashboard enhancements
     */
    function initDashboardEnhancements() {
        // Add loading states to form submissions
        const forms = document.querySelectorAll('form.wdseo-form');
        forms.forEach(function(form) {
            form.addEventListener('submit', function() {
                const submitBtn = form.querySelector('input[type="submit"]');
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.value = 'Saving...';
                    form.classList.add('wdseo-loading');
                }
            });
        });

        // Auto-save indication
        let saveTimeout;
        const formInputs = document.querySelectorAll('form.wdseo-form input, form.wdseo-form select, form.wdseo-form textarea');
        
        formInputs.forEach(function(input) {
            input.addEventListener('change', function() {
                clearTimeout(saveTimeout);
                
                // Show unsaved changes indicator
                if (!document.querySelector('.wdseo-unsaved-notice')) {
                    const notice = document.createElement('div');
                    notice.className = 'wdseo-notice wdseo-notice-warning wdseo-unsaved-notice';
                    notice.innerHTML = '<strong>⚠️ Unsaved Changes</strong> - Don\'t forget to save your settings!';
                    
                    const navWrapper = document.querySelector('.nav-tab-wrapper');
                    if (navWrapper) {
                        navWrapper.insertAdjacentElement('afterend', notice);
                    }
                }
            });
        });

        // Remove unsaved notice on form submit
        forms.forEach(function(form) {
            form.addEventListener('submit', function() {
                const notice = document.querySelector('.wdseo-unsaved-notice');
                if (notice) {
                    notice.remove();
                }
            });
        });

        // Character counter for textareas
        const descriptionTextareas = document.querySelectorAll('textarea[name*="description"]');
        descriptionTextareas.forEach(function(textarea) {
            addCharacterCounter(textarea);
        });

        // Enhanced checkbox interactions
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                const label = checkbox.closest('label');
                
                if (checkbox.checked) {
                    label.classList.add('wdseo-checked');
                } else {
                    label.classList.remove('wdseo-checked');
                }
            });
        });

        // Initialize checked state
        const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkedBoxes.forEach(function(checkbox) {
            const label = checkbox.closest('label');
            if (label) {
                label.classList.add('wdseo-checked');
            }
        });
    }

    /**
     * Add character counter to textarea
     */
    function addCharacterCounter(textarea) {
        const maxLength = 160; // Standard meta description length
        const counter = document.createElement('div');
        counter.className = 'wdseo-char-counter';
        
        textarea.insertAdjacentElement('afterend', counter);
        
        function updateCounter() {
            const length = textarea.value.length;
            const remaining = maxLength - length;
            
            let status = 'good';
            if (length > maxLength) status = 'over';
            else if (length > maxLength * 0.9) status = 'warning';
            
            counter.innerHTML = `
                <span class="wdseo-char-count wdseo-char-${status}">
                    ${length} characters
                    ${remaining < 0 ? `(${Math.abs(remaining)} over limit)` : `(${remaining} remaining)`}
                </span>
            `;
        }
        
        textarea.addEventListener('input', updateCounter);
        textarea.addEventListener('keyup', updateCounter);
        updateCounter();
    }

    /**
     * Initialize form validation
     */
    function initFormValidation() {
        // Twitter handle validation
        const twitterInput = document.querySelector('input[name="wdseo_twitter_site_handle"]');
        if (twitterInput) {
            twitterInput.addEventListener('input', function() {
                const value = twitterInput.value;
                
                if (value && !value.startsWith('@')) {
                    twitterInput.value = '@' + value;
                }
                
                // Validate Twitter handle format
                const isValid = /^@[A-Za-z0-9_]{1,15}$/.test(value);
                
                if (value && !isValid) {
                    twitterInput.classList.add('wdseo-invalid');
                    
                    let errorDiv = twitterInput.nextElementSibling;
                    if (!errorDiv || !errorDiv.classList.contains('wdseo-validation-error')) {
                        errorDiv = document.createElement('div');
                        errorDiv.className = 'wdseo-validation-error';
                        errorDiv.textContent = 'Please enter a valid Twitter handle (e.g., @username)';
                        twitterInput.insertAdjacentElement('afterend', errorDiv);
                    }
                } else {
                    twitterInput.classList.remove('wdseo-invalid');
                    const errorDiv = twitterInput.nextElementSibling;
                    if (errorDiv && errorDiv.classList.contains('wdseo-validation-error')) {
                        errorDiv.remove();
                    }
                }
            });
        }

        // URL pattern validation
        const robotsTextarea = document.querySelector('textarea[name="wdseo_robots_blocked_urls"]');
        if (robotsTextarea) {
            robotsTextarea.addEventListener('input', function() {
                const lines = robotsTextarea.value.split('\n');
                let hasErrors = false;
                
                lines.forEach(function(line) {
                    line = line.trim();
                    if (line && !line.startsWith('/')) {
                        hasErrors = true;
                    }
                });
                
                if (hasErrors) {
                    robotsTextarea.classList.add('wdseo-invalid');
                    
                    let errorDiv = robotsTextarea.nextElementSibling;
                    if (!errorDiv || !errorDiv.classList.contains('wdseo-validation-error')) {
                        errorDiv = document.createElement('div');
                        errorDiv.className = 'wdseo-validation-error';
                        errorDiv.textContent = 'URL patterns should start with / (e.g., /admin/*)';
                        robotsTextarea.insertAdjacentElement('afterend', errorDiv);
                    }
                } else {
                    robotsTextarea.classList.remove('wdseo-invalid');
                    const errorDiv = robotsTextarea.nextElementSibling;
                    if (errorDiv && errorDiv.classList.contains('wdseo-validation-error')) {
                        errorDiv.remove();
                    }
                }
            });
        }
    }

    /**
     * Initialize tooltips
     */
    function initTooltips() {
        // Add tooltips to feature icons
        const featureIcons = document.querySelectorAll('.wdseo-feature-icon');
        featureIcons.forEach(function(icon) {
            const row = icon.closest('tr');
            if (row) {
                const description = row.querySelector('.description');
                if (description) {
                    icon.setAttribute('title', description.textContent);
                }
            }
        });

        // Add tooltips to status indicators
        const enabledStatus = document.querySelectorAll('.wdseo-status-enabled');
        enabledStatus.forEach(function(status) {
            status.setAttribute('title', 'This feature is active and working');
        });

        const disabledStatus = document.querySelectorAll('.wdseo-status-disabled');
        disabledStatus.forEach(function(status) {
            status.setAttribute('title', 'This feature is currently disabled');
        });

        const warningStatus = document.querySelectorAll('.wdseo-status-warning');
        warningStatus.forEach(function(status) {
            status.setAttribute('title', 'This feature needs attention');
        });
    }

    /**
     * Initialize animations
     */
    function initAnimations() {
        // Animate form sections on tab change
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(function(tab) {
            tab.addEventListener('click', function(e) {
                const form = document.querySelector('.wdseo-form');
                if (form) {
                    form.style.opacity = '0.7';
                    
                    setTimeout(function() {
                        form.style.opacity = '1';
                    }, 150);
                }
            });
        });

        // Animate success messages using MutationObserver
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('notice-success')) {
                        node.style.display = 'none';
                        fadeIn(node, 300);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Smooth scroll to validation errors
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('wdseo-validation-error')) {
                const input = e.target.previousElementSibling;
                if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT')) {
                    smoothScrollTo(input, 300);
                    input.focus();
                }
            }
        });
    }

    /**
     * Tab persistence
     */
    function initTabPersistence() {
        // Save current tab to localStorage
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const href = tab.getAttribute('href');
                if (href && href.includes('tab=')) {
                    const tabId = href.split('tab=')[1];
                    localStorage.setItem('wdseo_current_tab', tabId);
                }
            });
        });

        // Restore tab on page load
        const savedTab = localStorage.getItem('wdseo_current_tab');
        if (savedTab && !window.location.href.includes('tab=')) {
            const newUrl = window.location.href + '&tab=' + savedTab;
            window.history.replaceState({}, '', newUrl);
        }
    }

    /**
     * Quick actions
     */
    function initQuickActions() {
        // Quick enable/disable toggles
        const quickToggles = document.querySelectorAll('.wdseo-quick-toggle');
        quickToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetSelector = toggle.getAttribute('data-target');
                const targetCheckbox = document.querySelector(targetSelector);
                
                if (targetCheckbox) {
                    targetCheckbox.checked = !targetCheckbox.checked;
                    targetCheckbox.dispatchEvent(new Event('change'));
                    
                    // Update toggle text
                    const isChecked = targetCheckbox.checked;
                    toggle.textContent = isChecked ? 'Disable' : 'Enable';
                    toggle.classList.toggle('wdseo-enabled', isChecked);
                }
            });
        });
    }

    /**
     * Add dynamic help text
     */
    function addDynamicHelp() {
        // Robots meta help
        const robotsSelects = document.querySelectorAll('select[name*="robots"]');
        robotsSelects.forEach(function(select) {
            select.addEventListener('change', function() {
                const value = select.value;
                let helpText = '';
                
                switch(value) {
                    case 'index,follow':
                        helpText = '✅ Search engines will index this content and follow links';
                        break;
                    case 'noindex,nofollow':
                        helpText = '🚫 Search engines will not index this content or follow links';
                        break;
                    case 'index,nofollow':
                        helpText = '📄 Search engines will index this content but not follow links';
                        break;
                    case 'noindex,follow':
                        helpText = '🔗 Search engines will not index this content but will follow links';
                        break;
                }
                
                const existingHelp = select.nextElementSibling;
                if (existingHelp && existingHelp.classList.contains('wdseo-dynamic-help')) {
                    existingHelp.remove();
                }
                
                if (helpText) {
                    const helpDiv = document.createElement('div');
                    helpDiv.className = 'wdseo-dynamic-help';
                    helpDiv.innerHTML = helpText;
                    select.insertAdjacentElement('afterend', helpDiv);
                }
            });
        });
    }

    // Initialize dynamic help
    addDynamicHelp();

    /**
     * Utility Functions
     */
    function fadeIn(element, duration) {
        element.style.display = 'block';
        element.style.opacity = '0';
        
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    function smoothScrollTo(element, duration) {
        const targetPosition = element.offsetTop - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = progress * (2 - progress);
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }
});

// Add custom CSS for JavaScript enhancements
const customCSS = `
<style>
.wdseo-char-counter {
    margin-top: 8px;
    font-size: 12px;
}

.wdseo-char-count.wdseo-char-good {
    color: var(--wdseo-success);
}

.wdseo-char-count.wdseo-char-warning {
    color: var(--wdseo-warning);
}

.wdseo-char-count.wdseo-char-over {
    color: var(--wdseo-danger);
    font-weight: 600;
}

.wdseo-validation-error {
    color: var(--wdseo-danger);
    font-size: 12px;
    margin-top: 4px;
    padding: 8px 12px;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 4px;
    border-left: 3px solid var(--wdseo-danger);
}

.wdseo-invalid {
    border-color: var(--wdseo-danger) !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.wdseo-dynamic-help {
    margin-top: 8px;
    padding: 8px 12px;
    background: var(--wdseo-gray-50);
    border-radius: 4px;
    font-size: 12px;
    border-left: 3px solid var(--wdseo-primary);
}

.wdseo-checked {
    background: rgba(99, 102, 241, 0.05);
    border-radius: 4px;
    padding: 4px 8px;
    margin: -4px -8px;
}

.wdseo-quick-toggle {
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 12px;
    background: var(--wdseo-gray-200);
    color: var(--wdseo-gray-700);
    text-decoration: none;
    margin-left: 8px;
    transition: var(--wdseo-transition);
}

.wdseo-quick-toggle:hover {
    background: var(--wdseo-gray-300);
}

.wdseo-quick-toggle.wdseo-enabled {
    background: var(--wdseo-success);
    color: white;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', customCSS);