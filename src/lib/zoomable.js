export function zoomable(node) {
  let scale = 1;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;

  let initialDistance = 0;
  let initialScale = 1;

  // Set css transform transition for smooth resetting
  node.style.transition = 'transform 0.1s ease-out';
  node.style.transformOrigin = 'center center';
  node.style.cursor = 'grab';

  function updateTransform() {
    node.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
      node.style.cursor = 'grabbing';
    } else if (e.touches.length === 2) {
      isDragging = false;
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      initialScale = scale;
    }
  }

  function handleTouchMove(e) {
    if (e.touches.length === 1 && isDragging) {
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      updateTransform();
    } else if (e.touches.length === 2) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      if (initialDistance > 0) {
        const factor = currentDistance / initialDistance;
        scale = Math.max(1, Math.min(initialScale * factor, 4));
        
        // If scale is reset to 1, clear pan offsets
        if (scale === 1) {
          translateX = 0;
          translateY = 0;
        }
        updateTransform();
      }
    }
  }

  function handleTouchEnd(e) {
    if (e.touches.length === 0) {
      isDragging = false;
      node.style.cursor = 'grab';
      if (scale <= 1.05) {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
      }
    } else if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  }

  // Mouse drag support for desktop
  function handleMouseDown(e) {
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      node.style.cursor = 'grabbing';
      e.preventDefault();
    }
  }

  function handleMouseMove(e) {
    if (isDragging && scale > 1) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    }
  }

  function handleMouseUp() {
    isDragging = false;
    node.style.cursor = scale > 1 ? 'grab' : 'default';
  }

  // Wheel zoom support for desktop
  function handleWheel(e) {
    e.preventDefault();
    const zoomFactor = 0.1;
    const direction = e.deltaY < 0 ? 1 : -1;
    const oldScale = scale;
    scale = Math.max(1, Math.min(scale + direction * zoomFactor, 4));

    if (scale === 1) {
      translateX = 0;
      translateY = 0;
    } else if (scale > 1) {
      const rect = node.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      
      translateX -= mouseX * (scale / oldScale - 1);
      translateY -= mouseY * (scale / oldScale - 1);
    }
    updateTransform();
  }

  // Double click/tap to reset or quick zoom
  function handleDblClick(e) {
    if (scale > 1) {
      scale = 1;
      translateX = 0;
      translateY = 0;
    } else {
      scale = 2;
      const rect = node.getBoundingClientRect();
      const clickX = e.clientX - rect.left - rect.width / 2;
      const clickY = e.clientY - rect.top - rect.height / 2;
      translateX = -clickX;
      translateY = -clickY;
    }
    updateTransform();
  }

  node.addEventListener('touchstart', handleTouchStart, { passive: false });
  node.addEventListener('touchmove', handleTouchMove, { passive: false });
  node.addEventListener('touchend', handleTouchEnd);
  node.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  node.addEventListener('wheel', handleWheel, { passive: false });
  node.addEventListener('dblclick', handleDblClick);

  return {
    destroy() {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('touchend', handleTouchEnd);
      node.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('dblclick', handleDblClick);
    }
  };
}
