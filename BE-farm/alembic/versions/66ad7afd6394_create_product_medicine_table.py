"""Create product_medicine table

Revision ID: 66ad7afd6394
Revises: ad6f98d273d4
Create Date: 2025-09-22 10:35:26.112760

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '66ad7afd6394'
down_revision: Union[str, None] = 'ad6f98d273d4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('product_medicine',
        sa.Column('id', sa.BigInteger(), nullable=False),
        sa.Column('name', sa.Text(), nullable=False),
        sa.Column('category_id', sa.SmallInteger(), nullable=True),
        sa.Column('line_id', sa.SmallInteger(), nullable=True),
        sa.Column('ingredients', sa.Text(), nullable=True),
        sa.Column('indications', sa.Text(), nullable=True),
        sa.Column('packaging', sa.Text(), nullable=True),
        sa.Column('unit_id', sa.SmallInteger(), nullable=True),
        sa.Column('price_unit', sa.Numeric(14, 2), nullable=True),
        sa.Column('price_total', sa.Numeric(14, 2), nullable=True),
        sa.Column('dose_unit_id', sa.SmallInteger(), nullable=True),
        sa.Column('price_per_dose', sa.Numeric(14, 2), nullable=True),
        sa.Column('support_price_per_dose', sa.Numeric(14, 2), nullable=True),
        sa.Column('is_featured', sa.Boolean(), server_default=sa.text('false'), nullable=False),
        sa.Column('cover_image_id', sa.BigInteger(), nullable=True),
        sa.Column('slug', sa.Text(), nullable=True),
        sa.Column('published_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('is_published', sa.Boolean(), server_default=sa.text('false'), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), server_default=sa.text('false'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['category_id'], ['lu_medicine_category.id'], ),
        sa.ForeignKeyConstraint(['line_id'], ['lu_medicine_line.id'], ),
        sa.ForeignKeyConstraint(['unit_id'], ['lu_unit.id'], ),
        sa.ForeignKeyConstraint(['dose_unit_id'], ['lu_dose_unit.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )
    op.create_index('idx_med_pub_time', 'product_medicine', ['is_published', 'category_id', 'is_featured', sa.text('published_at DESC'), sa.text('id DESC')], unique=False)
    op.create_index('idx_med_name_trgm', 'product_medicine', [sa.text("LOWER(name)")], unique=False, postgresql_using='gin')
    op.create_index('idx_med_pack_trgm', 'product_medicine', [sa.text("LOWER(packaging)")], unique=False, postgresql_using='gin')


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('idx_med_pack_trgm', table_name='product_medicine', postgresql_using='gin')
    op.drop_index('idx_med_name_trgm', table_name='product_medicine', postgresql_using='gin')
    op.drop_index('idx_med_pub_time', table_name='product_medicine')
    op.drop_table('product_medicine')
