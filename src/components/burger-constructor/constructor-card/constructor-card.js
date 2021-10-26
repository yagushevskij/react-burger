import ingridientPropTypes from "../../../utils/type";
import constructorCard from "./constructor-card.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  REMOVE_CONSTR_ITEM,
} from "../../../services/actions/cart";

const ConstructorCard = (props) => {
  const dispatch = useDispatch();
  const { data, totalCostDispatcher, index, moveCard } = props;


  const ref = useRef(null);
  const [{ handlerId, border }, drop] = useDrop({
    accept: "constructor-card",
    collect(monitor) {
      return {
        border: monitor.isOver() ? "1px solid #4C4CFF" : "1px solid transparent",
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ opacity }, drag] = useDrag({
    type: "constructor-card",
    item: () => {
      const id = data.key;
      return { id, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging()? 0 : 1,
    }),
  });
  drag(drop(ref));

  const removeCard = () => {
    dispatch({
      type: REMOVE_CONSTR_ITEM,
      item: data,
    });
    totalCostDispatcher({
      type: "remove",
      ingredient: data.type,
      cost: data.price,
    });
  };
  return (
    <li
      className={`${constructorCard.item}`}
      ref={ref}
      style={{ opacity, border }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={removeCard}
      />
    </li>
  );
};

ConstructorCard.propTypes = {
  data: ingridientPropTypes.isRequired,
};

export default ConstructorCard;
