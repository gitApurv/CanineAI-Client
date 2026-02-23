function DynamicInfoCard({
  item,
  cardClassName,
  iconWrapperClassName,
  iconClassName = "text-3xl",
  titleClassName,
  descriptionClassName,
}) {
  return (
    <div className={cardClassName}>
      <div aria-hidden="true" className={iconWrapperClassName}>
        <span className={`material-symbols-outlined ${iconClassName}`}>
          {item.icon}
        </span>
      </div>

      <h3 className={titleClassName}>{item.title}</h3>
      <p className={descriptionClassName}>{item.description}</p>
    </div>
  );
}

export default DynamicInfoCard;
