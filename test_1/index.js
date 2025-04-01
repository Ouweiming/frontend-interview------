document.addEventListener('DOMContentLoaded', function() {
    const block = document.getElementById('draggable');
    const container = document.getElementById('js-container');
    
    let isDragging = false;
    let offsetX, offsetY;
    
    // 鼠标按下时的事件
    block.addEventListener('mousedown', function(e) {
        isDragging = true;
        
        // 记录鼠标在积木块内的相对位置
        offsetX = e.clientX - block.getBoundingClientRect().left;
        offsetY = e.clientY - block.getBoundingClientRect().top;
        
        // 添加拖拽样式
        block.classList.add('dragging');
        
        // 防止默认行为和文本选择
        e.preventDefault();
    });
    
    // 鼠标移动时的事件
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // 计算新位置
        let newLeft = e.clientX - offsetX - container.getBoundingClientRect().left;
        let newTop = e.clientY - offsetY - container.getBoundingClientRect().top;
        
        // 限制在容器内
        const maxLeft = container.clientWidth - block.offsetWidth;
        const maxTop = container.clientHeight - block.offsetHeight;
        
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));
        
        // 设置积木块位置
        block.style.left = newLeft + 'px';
        block.style.top = newTop + 'px';
    });
    
    // 鼠标松开时的事件
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            block.classList.remove('dragging');
        }
    });
    
    // 防止拖拽过程中选中文本
    block.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});
