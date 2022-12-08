import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles/Footer.style';

function Footer() {
  return (
    <S.footer data-testid="footer">
      <Link
        to="/drinks"
        type="button"
      >
        <S.mealIcon className="material-icons" data-testid="drinks-bottom-btn">
          local_bar
        </S.mealIcon>
      </Link>

      <Link
        to="/meals"
        type="button"
      >
        <S.mealIcon className="material-icons" data-testid="meals-bottom-btn">
          restaurant
        </S.mealIcon>
      </Link>
    </S.footer>
  );
}

export default Footer;
