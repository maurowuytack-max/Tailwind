// header.js
// Toggle the site header open/closed via the header toggle button
document.addEventListener('DOMContentLoaded', function(){
    const header = document.querySelector('.site-header');
    if(!header) return;
    const toggleBtn = header.querySelector('.header-toggle');
    if(!toggleBtn) return;

    // Ensure header is always open and hide the manual toggle control
    // (Disable collapsing behavior so the header remains unfolded at all times)
    try{ header.classList.remove('collapsed'); }catch(e){}
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.textContent = '▾';
    // Hide the toggle since header is locked open
    toggleBtn.hidden = true;

    // Remove click toggle behavior because the header is always unfolded.

    // Optional: Toggle the header weeks menu when clicking the Week proces button
    const weeksTrigger = header.querySelector('.weeks-trigger');
    const weeksMenu = header.querySelector('.header-week-menu');
    if(weeksTrigger && weeksMenu){
        // Setup accessible default
        weeksTrigger.setAttribute('aria-expanded', 'false');
        weeksMenu.setAttribute('aria-hidden', 'true');

        weeksTrigger.addEventListener('click', function(e){
            e.stopPropagation();
            const expanded = weeksTrigger.getAttribute('aria-expanded') === 'true';
            weeksTrigger.setAttribute('aria-expanded', String(!expanded));
            weeksMenu.setAttribute('aria-hidden', String(expanded));
        });

        // Close the weeks menu when clicking outside
        document.addEventListener('click', function(e){
            if(!header.contains(e.target)){
                weeksTrigger.setAttribute('aria-expanded', 'false');
                weeksMenu.setAttribute('aria-hidden', 'true');
            }
        });

        // Close with ESC key
        document.addEventListener('keydown', function(e){
            if(e.key === 'Escape'){
                weeksTrigger.setAttribute('aria-expanded', 'false');
                weeksMenu.setAttribute('aria-hidden', 'true');
            }
        });

        // Open/close menu on hover for pointer devices (keeps aria attributes in sync)
        // Using mouseenter/mouseleave on the container ensures the menu stays open while
        // the cursor moves from the trigger to the menu.
        const weeksContainer = header.querySelector('.header-weeks');
        if(weeksContainer){
            // Mouse-based hover interaction
            weeksContainer.addEventListener('mouseenter', function(){
                weeksTrigger.setAttribute('aria-expanded', 'true');
                weeksMenu.setAttribute('aria-hidden', 'false');
            });
            weeksContainer.addEventListener('mouseleave', function(){
                weeksTrigger.setAttribute('aria-expanded', 'false');
                weeksMenu.setAttribute('aria-hidden', 'true');
            });

            // Keyboard focus interactions (focusin/focusout bubble across children)
            weeksContainer.addEventListener('focusin', function(){
                weeksTrigger.setAttribute('aria-expanded', 'true');
                weeksMenu.setAttribute('aria-hidden', 'false');
            });
            weeksContainer.addEventListener('focusout', function(e){
                // If the new focused element is outside the container, close
                const newFocusTarget = e.relatedTarget;
                if(!weeksContainer.contains(newFocusTarget)){
                    weeksTrigger.setAttribute('aria-expanded', 'false');
                    weeksMenu.setAttribute('aria-hidden', 'true');
                }
            });
        }
    }
});
