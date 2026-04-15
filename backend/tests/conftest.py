import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from app.core.database import Base
from app.api.deps import get_db
from app.main import app

# Use a separate SQLite database for tests
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_api.db"

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Create the tables
    Base.metadata.create_all(bind=engine)
    
    yield TestingSessionLocal
    
    # Clean up
    Base.metadata.drop_all(bind=engine)
    if os.path.exists("./test_api.db"):
        os.remove("./test_api.db")

@pytest.fixture
def db(setup_test_db):
    session = setup_test_db()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture(autouse=True)
def override_get_db(setup_test_db):
    def _get_test_db():
        try:
            db = setup_test_db()
            yield db
        finally:
            db.close()
    
    app.dependency_overrides[get_db] = _get_test_db
    yield
    app.dependency_overrides.clear()
