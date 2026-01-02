import ContentLoader from "react-content-loader"

// 7.0 Skeleton (взят с https://skeletonreact.com/) у нас нужен для красивого отображения ещё незагруженного контента на странице. Его мы рисуем на специальном ресурсе по размерам близко похожим на сами загружаемые блоки.
// (Go to [App.jsx])

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={580}
    viewBox="0 0 280 580"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="119" r="119" />
    <rect x="0" y="428" rx="10" ry="10" width="280" height="84" />
    <rect x="121" y="535" rx="25" ry="25" width="157" height="44" />
    <rect x="0" y="544" rx="10" ry="10" width="90" height="26" />
    <rect x="52" y="258" rx="10" ry="10" width="176" height="22" />
    <rect x="0" y="305" rx="10" ry="10" width="280" height="100" />
  </ContentLoader>
)

export default Skeleton