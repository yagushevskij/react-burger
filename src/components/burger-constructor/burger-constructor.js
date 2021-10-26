import { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

import burgerConstructor from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  getOrder,
  REMOVE_ORDER,
  ADD_CONSTR_ITEM,
  REMOVE_CONSTR_ITEM,
  UPDATE_CONSTR_ITEMS,
} from "../../services/actions/cart";
import { useDrop } from "react-dnd";
import ConstructorCard from "./constructor-card/constructor-card";

const itemsInitialState = { total: 0 };

const itemsReducer = (state, action) => {
  const ingredientCost =
    action.ingredient === "bun" ? action.cost * 2 : action.cost;
  switch (action.type) {
    case "add":
      return { total: state.total + ingredientCost };
    case "remove":
      return { total: state.total - ingredientCost };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const BurgerConstructor = () => {
  const [{ border }, sectionTarget] = useDrop({
    accept: "ingredient-card",
    drop(item) {
      handleDrop(item);
    },
    collect: (monitor) => ({
      border: monitor.isOver() ? "3px solid #4C4CFF" : "3px solid transparent",
    }),
  });
  const dispatch = useDispatch();
  const { constrItems, orderRequest } = useSelector((store) => store.cart);
  const [modal, setModal] = useState({
    isModalOpened: false,
  });
  const [totalCost, totalCostDispatcher] = useReducer(
    itemsReducer,
    itemsInitialState
  );

  const handleDrop = (item) => {
    const existedBun = constrItems.find((el) => el.type === "bun");
    if (item.type === "bun" && existedBun) {
      dispatch({
        type: REMOVE_CONSTR_ITEM,
        item: existedBun,
      });
      totalCostDispatcher({
        type: "remove",
        ingredient: existedBun.type,
        cost: existedBun.price,
      });
    }
    dispatch({
      type: ADD_CONSTR_ITEM,
      item: item,
    });
    totalCostDispatcher({
      type: "add",
      ingredient: item.type,
      cost: item.price,
    });
  };

  const handleCloseModal = () => {
    setModal({
      ...modal,
      isModalOpened: false,
    });
    dispatch({ type: REMOVE_ORDER });
  };
  const handleOpenModal = () => {
    setModal({
      ...modal,
      isModalOpened: true,
    });
  };

  const makeOrder = () => {
    const idsArr = constrItems.map((el) => el._id);
    dispatch(getOrder(idsArr));
    !orderRequest && handleOpenModal();
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const DragItem = constrItems[dragIndex];
    if (DragItem) {
      const prevItem = constrItems.splice(hoverIndex, 1, DragItem);
      constrItems.splice(dragIndex, 1, prevItem[0]);
      dispatch({
        type: UPDATE_CONSTR_ITEMS,
        items: constrItems,
      });
    }
  };

  const modalComp = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );
  const bun = constrItems.find((el) => el.type === "bun");
  return (
    <>
      {modal.isModalOpened && modalComp}
      <section
        className={`${burgerConstructor.section} ml-10 pl-4 mt-25`}
        ref={sectionTarget}
        style={{ border }}
      >
        {constrItems.length === 0 ? (
          <div
            className={`${burgerConstructor.info} text text_type_main-default`}
          >
            Перетащите в это окно ингредиенты чтобы собрать бургер
          </div>
        ) : (
          <>
            <ul className={`${burgerConstructor.list}`}>
              {bun && (
                <li
                  className={`${burgerConstructor.item} pl-8 pr-5`}
                  key={"bun-top" + bun._id}
                >
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                </li>
              )}
              <ul
                className={`${burgerConstructor.list} ${burgerConstructor.scroll}`}
              >
                {constrItems &&
                  constrItems.map((item, index) => {
                    if (item.type !== "bun") {
                      return (
                        <ConstructorCard
                          key={index}
                          data={item}
                          totalCostDispatcher={totalCostDispatcher}
                          index={index}
                          moveCard={moveCard}
                        />
                      );
                    }
                  })}
              </ul>
              {bun && (
                <li
                  className={`${burgerConstructor.item} pl-8 pr-5`}
                  key={"bun-bottom" + bun._id}
                >
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                </li>
              )}
            </ul>
            <div className={`${burgerConstructor.total} mt-10`}>
              <p className={`${burgerConstructor.total__cost} mr-10`}>
                <span className="text text_type_digits-medium mr-2">
                  {totalCost.total}
                </span>
                <CurrencyIcon type="primary" />
              </p>
              {bun && (
                <Button type="primary" size="large" onClick={makeOrder}>
                  Оформить заказ
                </Button>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default BurgerConstructor;
