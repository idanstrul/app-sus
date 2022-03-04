export default {
    template: `
    <section class="app-modal">
        <teleport to="#app-portal">
            <div class="portal-bg">
                <section class="portal-content">
                    <slot></slot>
                </section>
            </div>
        </teleport>
    </section>
    `
}